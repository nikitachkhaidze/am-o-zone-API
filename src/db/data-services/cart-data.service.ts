import { Knex } from 'knex';
import { knex } from '../../index';
import { CartItemUpdate, CartProduct } from '../../types/cart-product';
import { Product } from '../../types/product.interface';

class CartDataService {
  async getCartItems(userId: number): Promise<(Product & Pick<CartProduct, 'quantity'>)[]> {
    return knex.transaction(async (trx) => {
      let [cart] = await this.getCartByUserId(userId, trx);

      if (!cart) {
        [cart] = await this.createCart(userId, trx);
      }

      return trx
        .select('product.*', 'quantity')
        .from('cart_product')
        .join('product', 'cart_product.productId', '=', 'product.id')
        .where('cartId', '=', cart.id);
    });
  }

  async updateCartItem(userId: number, {
    productId,
    quantity,
  }: CartItemUpdate) {
    return knex.transaction(async (trx) => {
      const product = await trx('product')
        .where('id', productId);

      if (!product) {
        throw new Error('Product not found');
      }

      let [cart] = await this.getCartByUserId(userId, trx);

      if (!cart) {
        [cart] = await this.createCart(userId, trx);
      }

      return trx('cart_product')
        .insert({
          cartId: cart.id,
          productId,
          quantity,
        })
        .onConflict(['cartId', 'productId'])
        .merge({ quantity })
        .returning('*');
    });
  }

  private async getCartByUserId(userId: number, trx: Knex.Transaction) {
    return trx('cart')
      .select('id')
      .where('userId', '=', userId);
  }

  async createCart(userId: number, trx: Knex.Transaction) {
    return trx('cart')
      .insert({ userId })
      .returning('*');
  }
}

export const cartDataService = new CartDataService();
