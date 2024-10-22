import { knex } from '../../index';
import { UserInsert, UserUpdate } from '../../types/user.interface';
import { cartDataService } from './cart-data.service';

export class UserDataService {
  async insertUser(userInsert: UserInsert) {
    return knex.transaction(async (trx) => {
      const [user] = await trx('user')
        .insert(userInsert)
        .returning(['id', 'username', 'email', 'isAdmin', 'createdAt']);

      await cartDataService.createCart(user.id, trx);

      return user;
    });
  }

  async updateUser(userUpdate: UserUpdate) {
    return knex('user')
      .where({ username: userUpdate.username })
      .update(userUpdate)
      .returning(['username', 'email'])
      .first();
  }

  async getUserByUsername(username: string) {
    return knex('user')
      .select()
      .where({ username })
      .first();
  }
}

export const userDataService = new UserDataService();
