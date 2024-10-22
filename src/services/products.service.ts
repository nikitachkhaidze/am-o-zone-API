import { productsDataService } from '../db/data-services/products-data.service';

class ProductsService {
  async getProducts(category: string, sort: string, pageSize: number, page: number) {
    const { products, totalItems } = await productsDataService.getProducts(category, sort, pageSize, page);

    return {
      products,
      pagination: {
        currentPageIndex: page - 1,
        totalItems,
      },
    };
  }

  async getProductById(id: string) {
    return productsDataService.getProductById(id);
  }

  async getCategories() {
    return productsDataService.getCategories();
  }
}

export const productsService = new ProductsService();
