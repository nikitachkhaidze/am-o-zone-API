import { Knex } from 'knex';
import { User, UserInsert, UserUpdate } from '../user.interface';
import { Product, ProductInsert, ProductUpdate } from '../product.interface';
import { Category, CategoryInsert, CategoryUpdate } from '../category.interface';
import { Cart, CartInsert } from '../cart.interface';
import { CartProduct } from '../cart-product';

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
        >,
        cart: Knex.CompositeTableType<
            Cart,
            CartInsert
        >,
        cart_product: Knex.CompositeTableType<
            CartProduct
        >
    }
}
