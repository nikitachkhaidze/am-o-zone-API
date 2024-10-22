import { cartDataService } from '../db/data-services/cart-data.service';
import { CartItemUpdate } from '../types/cart-product';

class CartService {
  async getCartItems(userId: number) {
    return cartDataService.getCartItems(userId);
  }

  async updateCartItem(userId: number, update: CartItemUpdate) {
    return cartDataService.updateCartItem(userId, update);
  }
}

export const cartService = new CartService();
