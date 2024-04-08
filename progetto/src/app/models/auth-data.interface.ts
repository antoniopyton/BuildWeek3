export interface AuthData {
  accessToken: string;
  user: {
    email: string;
    name: string;
    id: number;
  };
}
