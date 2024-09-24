export interface User {
    id: number,
    username: string,
    email: string,
    password: string,
    isAdmin: boolean,
    createdAt: string,
}

export type UserInsert = Pick<User, 'username' | 'password' | 'email'>;
export type UserUpdate = Partial<UserInsert>;
