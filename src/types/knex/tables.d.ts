import { Knex } from 'knex';
import { User, UserInsert, UserUpdate } from '../user.interface';
import { Product, ProductInsert, ProductUpdate } from '../product.interface';
import { Category, CategoryInsert, CategoryUpdate } from '../category.interface';

declare module 'knex/types/tables' {
    interface Tables {
        product: Knex.CompositeTableType<
            Product,
            ProductInsert,
            ProductUpdate
        >;
        category: Knex.CompositeTableType<
            Category,
            CategoryInsert,
            CategoryUpdate
        >,
        user: Knex.CompositeTableType<
            User,
            UserInsert,
            UserUpdate
        >;
    }
}
