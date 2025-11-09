const storageKeys = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  id: "id",
  email: "email",
  user: "user",
  theme: "tailwind-theme",
} as const;

export class StorageUtil {
  // accessToken
  static saveAccessToken(accessToken: string): void {
    localStorage.setItem(storageKeys.accessToken, accessToken);
  }
  static getAccessToken(): string {
    return localStorage.getItem(storageKeys.accessToken) || "";
  }
  static removeAccessToken(): void {
    localStorage.removeItem(storageKeys.accessToken);
  }

  // refreshToken
  static saveRefreshToken(refreshToken: string): void {
    localStorage.setItem(storageKeys.refreshToken, refreshToken);
  }
  static getRefreshToken(): string {
    return localStorage.getItem(storageKeys.refreshToken || {}) || "";
  }
  static removeRefreshToken(): void {
    localStorage.removeItem(storageKeys.refreshToken);
  }

  // id
  static saveId(id: string): void {
    localStorage.setItem(storageKeys.id, id);
  }
  static getAccessId(): string {
    return localStorage.getItem(storageKeys.id) || "";
  }
  static removeId(): void {
    localStorage.removeItem(storageKeys.id);
  }

  // email
  static saveEmail(email: string): void {
    localStorage.setItem(storageKeys.email, email);
  }
  static getAccessEmail(): string {
    return localStorage.getItem(storageKeys.email) || "";
  }
  static removeEmail(): void {
    localStorage.removeItem(storageKeys.email);
  }

  // user
  static saveUser(data: any): void {
    localStorage.setItem(storageKeys.user, data || {});
  }
  static getUser(): any {
    return localStorage.getItem(storageKeys.user || {});
  }
  static removeUser(): void {
    localStorage.removeItem(storageKeys.user);
  }

  // theme
  static saveTheme(theme: string): void {
    localStorage.setItem(storageKeys.theme, theme);
  }
  static getTheme(): string {
    return localStorage.getItem(storageKeys.theme) || "";
  }
  static removeTheme(): void {
    localStorage.removeItem(storageKeys.theme);
  }
}
