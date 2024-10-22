export interface CartProduct {
    cartId: number,
    productId: number,
    quantity: number,
}

export type CartItemUpdate = Pick<CartProduct, 'productId' | 'quantity'>
