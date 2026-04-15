import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TUser } from "../../utils/types";
import type { RootState } from "../../services/store/store";
import type { User } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getCookie, setCookie } from "../../services/cookie";

export const signUpUser = createAsyncThunk<TUser, { email: string; password: string }>(
  "user/signUpUser",
  async ({ email, password }, { dispatch }) => {
    const auth = getAuth();
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

    const user = userCredentials.user;   // ← всегда берём .user

    if (!user) {
      throw new Error("User creation failed");
    }

    const accessToken = await user.getIdToken();
    const refreshToken = user.refreshToken;   // ← это string | null, проверь на null если нужно

    const userData: TUser = {
      email: user.email!,
      password,                    // ты сам сохраняешь пароль (не очень безопасно, но оставил как было)
      accessToken,
      refreshToken: refreshToken || "",
    };

    dispatch(setUser(userData));
    setCookie("accessToken", accessToken);
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

    return userData;   // ← всегда возвращаем TUser
  }
);

export const loginUser = createAsyncThunk<TUser, { email: string; password: string }>(
  "user/loginUser",
  async ({ email, password }, { dispatch }) => {
    const auth = getAuth();
    const userCredentials = await signInWithEmailAndPassword(auth, email, password);

    const user = userCredentials.user;

    if (!user) {
      throw new Error("Login failed");
    }

    const accessToken = await user.getIdToken();
    const refreshToken = user.refreshToken;

    const userData: TUser = {
      email: user.email!,
      password,
      accessToken,
      refreshToken: refreshToken || "",
    };

    dispatch(setUser(userData));
    setCookie("accessToken", accessToken);
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

    return userData;   // ← всегда TUser
  }
);

const checkAuthState = (
  auth: ReturnType<typeof getAuth>
): Promise<User | null> => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user);
    });
  });
};

export const checkAuth = createAsyncThunk<TUser | null>(
  "user/checkAuth",
  async (_, thunkAPI) => {
    const accessToken = getCookie("accessToken");

    if (!accessToken) {
      return thunkAPI.rejectWithValue("No access token");
    }

    const auth = getAuth();
    const user = await checkAuthState(auth);

    if (!user) {
      return thunkAPI.rejectWithValue("No user found");
    }

    const newAccessToken = await user.getIdToken();
    const refreshToken = user.refreshToken;

    const userData: TUser = {
      email: user.email!,
      password: "",
      accessToken: newAccessToken,
      refreshToken,
    };

    setCookie("accessToken", newAccessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return userData;
  }
);

export type userState = {
  user: TUser | null;
  isAuth: boolean;
  success: boolean;
  loading: boolean;
  error: string | null;
  initialized: boolean;
};

export const initialState: userState = {
  user: null,
  isAuth: false,
  success: false,
  loading: false,
  error: null,
  initialized: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
      state.isAuth = true;
      state.loading = false;
      state.error = null;
      state.success = true;
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload || "An error occurred";
    },
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("refreshToken");
      document.cookie = "accessToken=;";
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signUpUser.fulfilled,
        (state, action: PayloadAction<TUser | undefined>) => {
          state.loading = false;
          state.isAuth = true;
          state.success = true;
          state.error = null;
          if (action.payload) {
            state.user = action.payload;
          }
        }
      )
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<TUser | undefined>) => {
          state.loading = false;
          state.isAuth = true;
          state.success = true;
          state.error = null;
          if (action.payload) {
            state.user = action.payload;
          }
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      })
      .addCase(checkAuth.pending, (state) => {
        state.loading = true; 
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.initialized = true;
        if (action.payload) {
          state.user = action.payload;
          state.isAuth = true;
        } else {
          state.user = null;
          state.isAuth = false;
        }
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.isAuth = false;
        state.user = null;
        state.initialized = true;
      });
  },
});

export const { setUser, setIsAuth, logout, loginFailure, setLoading } =
  userSlice.actions;
export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;
