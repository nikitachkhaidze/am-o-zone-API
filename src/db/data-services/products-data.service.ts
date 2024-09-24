import { defaultSortParams, SortOrder, SortParams } from '../../types/sort-order.interface';
import { knex } from '../../index';
import { Product } from '../../types/product.interface';

class ProductsDataService {
  async getProducts(category: string, sort: string, pageSize: number, page: number) {
    const offset = pageSize * (page - 1);
    const sortToParamsMap = new Map<string, SortParams>([
      ['priceASC', { column: 'price', order: SortOrder.asc }],
      ['priceDESC', { column: 'price', order: SortOrder.desc }],
    ]);
    const sortParams = sortToParamsMap.get(sort) ?? defaultSortParams;

    const commonQuery = knex<Product>('product')
      .distinct('product.id as id')
      .select(
        'product.name as name',
        'product.description',
        'product.img_url',
        'product.price',
        'product.quantity_in_stock',
        'product.size',
        'product.color',
      )
      .join('category_product', 'product.id', '=', 'category_product.product_id')
      .join('category', 'category_product.category_id', '=', 'category.id')
      .modify((queryBuilder) => {
        if (category) {
          queryBuilder.where({ 'category.id': category });
        }
      });

    const products: Product[] = await commonQuery
      .clone()
      .modify((queryBuilder) => {
        if (sort) {
          queryBuilder.orderBy(sortParams.column, sortParams.order);
        }
      })
      .limit(pageSize)
      .offset(offset);

    const totalItems = (await commonQuery.clone()).length;

    return {
      products,
      totalItems,
    };
  }

  async getProductById(id: string) {
    return knex('product')
      .select()
      .where('id', id)
      .first();
  }

  async getCategories() {
    return knex('category')
      .select();
  }
}

export const productsDataService = new ProductsDataService();
