import { UserUpdate } from '../types/user.interface';
import { userDataService } from '../db/data-services/user-data.service';

class UserService {
  async updateUser(userUpdate: UserUpdate) {
    return userDataService.updateUser(userUpdate);
  }
}

export const userService = new UserService();
