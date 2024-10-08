export interface Product {
    id: number,
    name: string,
    description: string,
    imgUrl: string,
    price: number,
    quantityInStock: number,
    size?: string,
    color?: string,
}

export type ProductInsert = Omit<Product, 'id'>;
export type ProductUpdate = Partial<ProductInsert>
