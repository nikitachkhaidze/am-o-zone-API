import { knex } from '../../index';
import { UserInsert, UserUpdate } from '../../types/user.interface';

export class UserDataService {
  async insertUser(userInsert: UserInsert) {
    return knex('user')
      .insert(userInsert)
      .returning(['id', 'username', 'email', 'isAdmin', 'createdAt']);
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
