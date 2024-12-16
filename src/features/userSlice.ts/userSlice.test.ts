import { TUser } from "../../utils/types";
import userSlice, {
  initialState,
  loginUser,
  logout,
  setUser,
  signUpUser,
} from "./userSlice";
import userReducer from "./userSlice";

const mockUser: TUser = {
  email: "Vd5lR@example.com",
  password: "password",
  accessToken: "test-token",
  refreshToken: "test-refresh-token",
};

describe("Test UserSlice", () => {
  it("Should return the initial state", () => {
    expect(userReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });
  it("Should set user", () => {
    const action = setUser(mockUser);
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      user: mockUser,
      isAuth: true,
      success: true,
      loading: false,
      error: null,
    });
  });
  it("Should logout", () => {
    const action = logout();
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      user: null,
      isAuth: false,
      success: false,
      loading: false,
      error: null,
    });
  });
  it("test signUpUser", () => {
    const action = { type: signUpUser.fulfilled.type, payload: mockUser };
    const newState = userReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      user: mockUser,
      isAuth: true,
      success: true,
      loading: false,
      error: null,
    });
  });
  it("test failed signUpUser", () => {
    const action = { type: signUpUser.rejected.type, error: {message: "error"} };
    const newState = userReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      user: null,
      isAuth: false,
      success: false,
      loading: false,
      error: "error",
    });
  });
  it("test loginUser", () => {
    const action = { type: loginUser.fulfilled.type, payload: mockUser };
    const newState = userReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      user: mockUser,
      isAuth: true,
      success: true,
      loading: false,
      error: null,  
    })
  })
  it("test failed loginUser", () => {
    const action = { type: loginUser.rejected.type, error: {message: "error"} };
    const newState = userReducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      user: null,
      isAuth: false,
      success: false,
      loading: false,
      error: "error",
    });
  });
});
