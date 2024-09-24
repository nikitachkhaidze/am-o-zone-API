import { CamelizeKeys } from './camelize-keys.type';

export interface CategoryData {
    id: string,
    name: string,
}

export type Category = CamelizeKeys<CategoryData>;
