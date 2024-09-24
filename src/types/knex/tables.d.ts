import { Knex } from 'knex';
import { User, UserData } from '../user.interface';
import { Product, ProductData } from '../product.interface';
import { Category, CategoryData } from '../category.interface';

declare module 'knex/types/tables' {
    interface Tables {
        product: Knex.CompositeTableType<
            Product,
            Omit<ProductData, 'id'>,
            Partial<Omit<ProductData, 'id'>>
        >;
        category: Knex.CompositeTableType<
            Category,
            Omit<CategoryData, 'id'>,
            Partial<Omit<CategoryData, 'id'>>
        >,
        user: Knex.CompositeTableType<
            User,
            Omit<UserData, 'id' | 'is_admin'>,
            Partial<Pick<UserData, 'username' | 'password' | 'email'>>
        >;
    }
}
