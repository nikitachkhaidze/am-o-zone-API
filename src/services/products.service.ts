import { QueryConfig } from 'pg';
import { SelectQuery } from '../db/queries/select-query';
import { pool } from '../index';
import { Product } from '../types/product.interface';
import { mapKeysToCamelCase } from '../utils/map-keys-to-camel-case';

class ProductsService {
  async getProducts(category: string, sort: string, pageSize: number, offset: number) {
    const filters = category ? {
      'category.name': category,
    } : undefined;

    const selectList = 'product.id AS id,\n'
          + '       product.name AS name,\n'
          + '       product.description,\n'
          + '       product.img_url,\n'
          + '       product.price,\n'
          + '       product.quantity_in_stock,\n'
          + '       product.size,\n'
          + '       product.color';

    const query = new SelectQuery(selectList, 'product')
      .addJoins({
        category_product: 'product.id = category_product.product_id',
        category: 'category_product.category_id = category.id',
      })
      .addWheres(filters)
      .addOrderBy(sort)
      .addLimit(pageSize)
      .addOffset(offset)
      .getQuery();

    const productsQueryResult = await pool.query<Product>(query);
    const products = productsQueryResult.rows;

    const totalProductsQuery = await pool.query('SELECT COUNT(*) FROM product');

    return ({
      products: products.map(mapKeysToCamelCase),
      total: totalProductsQuery.rows[0].count,
    });
  }

  async getOneProduct(id: string) {
    const query: QueryConfig = {
      text: 'SELECT * FROM product WHERE id = $1',
      values: [id],
    };
    const productsQueryResult = await pool.query<Product>(query);
    const product = productsQueryResult.rows[0];

    return mapKeysToCamelCase(product);
  }

  async getCategories() {
    const categoriesQueryResult = await pool.query<{ categories: string[] }>(
      'SELECT array_agg(name) as categories FROM category',
    );
    const { categories } = categoriesQueryResult.rows[0];

    return categories;
  }
}

export const productsService = new ProductsService();
