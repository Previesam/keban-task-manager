export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  created_at: string;
  update_at: string;
}

export interface CreateUserPayload {
  first_name: string;
  last_name: string;
  email: string;
  status: number;
}
