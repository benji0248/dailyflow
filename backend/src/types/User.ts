export interface NewUser {
    name: string;
    email: string;
    password: string;
  }
export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: number;
    created_at: Date;
    updated_at?: Date;
}
  