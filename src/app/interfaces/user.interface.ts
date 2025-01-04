export interface User {
  user_id: number;
  name: string;
  email: string;
  password: string;
  roles: string[];
  token: string;
}
