import { Request, Response } from 'express';
import { productsService } from '../services/products.service';

class ProductController {
  async getProducts(req: Request, res: Response) {
    try {
      const category = req.query.category as string;
      const pageSize = +(req.query.pageSize ?? 10);
      const page = +(req.query.page ?? 1);
      const sort = req.query.sort as string;

      const response = await productsService.getProducts(category, sort, pageSize, page);

      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  }

  async getOneProduct(req: Request, res: Response) {
    try {
      const response = await productsService.getProductById(req.params.id);

      res.status(200).json(response);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  async getCategories(req: Request, res: Response) {
    try {
      const categories = await productsService.getCategories();

      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
}

export const productController = new ProductController();
