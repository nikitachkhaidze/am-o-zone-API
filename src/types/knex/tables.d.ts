import { Knex } from 'knex';
import { User } from '../user.interface';
import { Product } from '../product.interface';
import { Category } from '../category.interface';

declare module 'knex/types/tables' {
    interface Tables {
        product: Knex.CompositeTableType<
            Product,
            Omit<Product, 'id'>,
            Partial<Omit<Product, 'id'>>
        >;
        category: Knex.CompositeTableType<
            Category,
            Omit<Category, 'id'>,
            Partial<Omit<Category, 'id'>>
        >,
        user: Knex.CompositeTableType<
            User,
            Pick<User, 'username' | 'password' | 'email'>
        >;
    }
}
