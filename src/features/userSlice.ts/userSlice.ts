import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TUser } from "../../utils/types";
import { RootState } from "../../services/store/store";
import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getCookie, setCookie } from "../../services/cookie";

export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async (
    { email, password }: { email: string; password: string },
    { dispatch }
  ) => {
    try {
      const auth = getAuth();
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredentials.user;
      if (user) {
        const accessToken = await user.getIdToken();
        const refreshToken = await user.refreshToken;
        dispatch(setUser({ email, password, accessToken, refreshToken }));
        setCookie("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        return { email, password, accessToken, refreshToken };
      }
      return user;
    } catch (error: any) {
      const errorMessage =
        error.code === "auth/email-already-in-use"
          ? "This email is already registered."
          : error.code === "auth/invalid-email"
            ? "Invalid email address."
            : "SignUp failed. Please try again later.";

      dispatch(loginFailure(errorMessage));
      throw new Error(errorMessage);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { dispatch }
  ) => {
    try {
      const auth = getAuth();
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      if (user) {
        const accessToken = await user.getIdToken();
        const refreshToken = user.refreshToken;
        dispatch(setUser({ email, password, accessToken, refreshToken }));
        setCookie("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        return { email, password, accessToken, refreshToken };
      }
      return user;
    } catch (error) {
      let errorMessage = "Login failed. Please check your email or password.";

      dispatch(loginFailure(errorMessage));
      throw new Error(errorMessage);
    }
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
        state.loading = true; // Начало загрузки
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
