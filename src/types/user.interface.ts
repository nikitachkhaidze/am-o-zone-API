import { CamelizeKeys } from './camelize-keys.type';

export interface UserData {
    id: number,
    username: string,
    email: string,
    password: string,
    is_admin: boolean,
}

export type User = CamelizeKeys<UserData>;
