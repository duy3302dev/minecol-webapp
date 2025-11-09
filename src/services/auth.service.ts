import { axiosInstance } from "@/infrastructure/axios";
import type { LoginDto } from "@/shared/entity/dtos/login.dto";
import type { UserDto } from "@/shared/entity/dtos/user.dto";
import type { ChangePasswordInput } from "@/shared/entity/input/change-password.input";
import type { LoginInput } from "@/shared/entity/input/login.input";
import type { SignupInput } from "@/shared/entity/input/sign-up.input";
import type { UpdateProfileInput } from "@/shared/entity/input/user.input";
import { isBrowser } from "@/shared/lib/brower";
import { StorageUtil } from "@/shared/lib/storage";

export class AuthService {
  protected apiPath: string = "/auth";

  private getAuthHeaders() {
    const token = isBrowser ? StorageUtil.getAccessToken() : "";
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  login = async (params: { input: LoginInput }): Promise<LoginDto> => {
    const { input } = params;
    return axiosInstance
      .post<LoginDto>(`${this.apiPath}/login`, input)
      .then((res) => res.data);
  };

  refreshToken = async (params: {
    input: { refreshToken: string };
  }): Promise<string> => {
    const { input } = params;
    return axiosInstance
      .post<string>(`${this.apiPath}/refresh-token`, input)
      .then((res) => res.data);
  };

  signup = async (params: { input: SignupInput }): Promise<LoginDto> => {
    const { input } = params;
    return axiosInstance
      .post<LoginDto>(`${this.apiPath}/signup`, input)
      .then((res) => res.data);
  };

  getProfile = async (): Promise<UserDto> => {
    return axiosInstance
      .get<UserDto>(`${this.apiPath}/user/me`, {
        headers: this.getAuthHeaders(),
      })
      .then((res) => res.data);
  };

  updateProfile = async (params: {
    input: UpdateProfileInput;
  }): Promise<UserDto> => {
    const { input } = params;
    return axiosInstance
      .put<UserDto>(`${this.apiPath}/user/me`, input, {
        headers: this.getAuthHeaders(),
      })
      .then((res) => res.data);
  };

  changePassword = async (params: {
    input: ChangePasswordInput;
  }): Promise<any> => {
    const { input } = params;
    return axiosInstance
      .put<any>(`${this.apiPath}/change-password`, input, {
        headers: this.getAuthHeaders(),
      })
      .then((res) => res.data);
  };
}

export const authService = new AuthService();
