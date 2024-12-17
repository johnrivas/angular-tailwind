export interface User {
  usu_id: number;
  name: string;
  email: string;
  password: string;
  roles: string[];
  token: string;
}
