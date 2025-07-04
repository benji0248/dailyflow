export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    created_at: Date;
    updated_at: Date;
}

export interface newUser {
    name: string;
    email: string;
    password: string;
    role: string;
}