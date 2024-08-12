import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearToken, instance, setToken } from "../../api/api";
import { AxiosError } from "axios";
import { RootState } from "../store";

interface Credentials {
  email: string;
  password: string;
  name?: string;
  phone?: string;
}

interface AuthResponse {
  token: string;
  user: {
    email: string;
    name: string;
    phone: string;
  };
}

interface RefreshResponse {
  token: string;
  user: {
    email: string;
    name: string;
    phone: string;
  };
}
interface ThunkError {
  message: string;
}
export const registerThunk = createAsyncThunk<
  AuthResponse,
  Credentials,
  {
    rejectValue: string;
  }
>("register", async (credentials, thunkAPI) => {
  try {
    const { data } = await instance.post<AuthResponse>(
      "/user/register",
      credentials
    );
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 409) {
        return thunkAPI.rejectWithValue("The email is already in use.");
      }
    }

    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

export const loginThunk = createAsyncThunk<
  AuthResponse,
  Credentials,
  {
    rejectValue: string;
  }
>("login", async (credentials, thunkAPI) => {
  try {
    const { data } = await instance.post<AuthResponse>(
      "/user/login",
      credentials
    );
    setToken(data.token);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 403) {
        return thunkAPI.rejectWithValue(
          "The email doesn't exist or password is incorrect. Please try again."
        );
      }
    }
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

export const logoutThunk = createAsyncThunk(
  "logout",
  async (token, thunkAPI) => {
    try {
      await instance.post("/user/logout", token);
      clearToken();
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

export const fetchRefreshThunk = createAsyncThunk<
  RefreshResponse,
  void,
  {
    rejectValue: ThunkError;
  }
>("user/refresh", async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const persistedToken = state.auth.token;

  if (persistedToken === null) {
    return thunkAPI.rejectWithValue({ message: "Imposible refresh user." });
  }

  try {
    setToken(persistedToken);
    const { data } = await instance.post<RefreshResponse>("/user/refresh", {
      token: persistedToken,
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: (error as Error).message });
  }
});
