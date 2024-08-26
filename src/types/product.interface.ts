export interface Product {
    id: number,
    name: string,
    description: string,
    img_url: string,
    price: number,
    quantity_in_stock: number,
    size?: string,
    color?: string,
}
