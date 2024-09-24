import { CamelizeKeys } from './camelize-keys.type';

export interface ProductData {
    id: number,
    name: string,
    description: string,
    img_url: string,
    price: number,
    quantity_in_stock: number,
    size?: string,
    color?: string,
}

export type Product = CamelizeKeys<ProductData>;
