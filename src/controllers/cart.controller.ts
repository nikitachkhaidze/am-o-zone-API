import { Request, Response } from 'express';
import { cartService } from '../services/cart.service';

class CartController {
  async getCartItems(req: Request, res: Response) {
    try {
      const userId = +req.params.id;
      const result = await cartService.getCartItems(userId);

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json();
    }
  }

  async updateCartItem(req: Request, res: Response) {
    try {
      const userId = +req.params.id;
      const result = await cartService.updateCartItem(userId, req.body);

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json();
    }
  }
}

export const cartController = new CartController();
