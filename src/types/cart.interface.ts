export interface Cart {
    id: number,
    userId: number,
}

export type CartInsert = Pick<Cart, 'userId'>;
