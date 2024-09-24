import AES from 'crypto-js/aes';
import CryptoJS from 'crypto-js/core';
import jwt from 'jsonwebtoken';
import { userDataService } from '../db/data-services/user-data.service';
import { User, UserInsert } from '../types/user.interface';
import { ErrorMessage } from '../const/error.const';

class AuthService {
  async registerUser(userInsert: UserInsert) {
    const passwordSecret = process.env.PASSWORD_SECRET ?? '';
    const encryptedPassword = AES.encrypt(userInsert.password, passwordSecret).toString();

    const savedUser = await userDataService.insertUser({
      ...userInsert,
      password: encryptedPassword,
    });

    return savedUser[0];
  }

  async loginUser(username: string, userPassword: string) {
    const user = await userDataService.getUserByUsername(username);

    if (!user) {
      throw new Error(ErrorMessage.invalidUsernameOrPassword);
    }

    const passwordSecret = process.env.PASSWORD_SECRET ?? '';
    const decryptedPassword = AES.decrypt(user.password, passwordSecret).toString(CryptoJS.enc.Utf8);

    if (decryptedPassword !== userPassword) {
      throw new Error(ErrorMessage.invalidUsernameOrPassword);
    }

    const jwtSecretKey = process.env.JWT_SECRET ?? '';
    const accessToken = jwt.sign({
      id: user.id,
      isAdmin: user.isAdmin,
    }, jwtSecretKey, { expiresIn: '3d' });
    const { password, ...userInfo } = user;

    const loggedInUser: Omit<User, 'password'> & { accessToken: string } = { ...userInfo, accessToken };

    return loggedInUser;
  }
}

export const authService = new AuthService();
