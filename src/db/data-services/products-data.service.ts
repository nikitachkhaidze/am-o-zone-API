import { QueryConfig } from 'pg';
import { SelectQuery } from '../queries/select-query';
import { pool } from '../../index';
import { Product } from '../../types/product.interface';

class ProductsDataService {
  async getProducts(category: string, sort: string, pageSize: number, page: number) {
    const filters = category ? {
      'category.name': category,
    } : undefined;
    const offset = pageSize * (page - 1);

    const selectList = 'DISTINCT product.id AS id,\n'
          + '       product.name AS name,\n'
          + '       product.description,\n'
          + '       product.img_url,\n'
          + '       product.price,\n'
          + '       product.quantity_in_stock,\n'
          + '       product.size,\n'
          + '       product.color';

    const countQuery = new SelectQuery(selectList, 'product')
      .addJoins({
        category_product: 'product.id = category_product.product_id',
        category: 'category_product.category_id = category.id',
      })
      .addWheres(filters)
      .getQuery();

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

    const productsQueryResult = await pool.query<Product & { total: number }>(query);
    const countQueryResult = await pool.query<Product & { total: number }>(countQuery);

    return {
      products: productsQueryResult.rows,
      totalItems: countQueryResult.rowCount,
    };
  }

  async getProductById(id: string) {
    const query: QueryConfig = {
      text: 'SELECT * FROM product WHERE id = $1',
      values: [id],
    };
    const productsQueryResult = await pool.query<Product>(query);

    return productsQueryResult.rows[0];
  }

  async getCategories() {
    const categoriesQueryResult = await pool.query<{ categories: string[] }>(
      'SELECT array_agg(name) as categories FROM category',
    );
    const { categories } = categoriesQueryResult.rows[0];

    return categories;
  }
}

export const productsDataService = new ProductsDataService();
