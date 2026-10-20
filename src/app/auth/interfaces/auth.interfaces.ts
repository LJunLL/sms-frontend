export interface AuthResponse{
  token: string;
  username: string;
  roles: string[];
}

export interface Login{
  username: string;
  password: string;
}

export interface CurrentUser{
  username: string;
  roles: string[];
}
