import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { ErrorMessage } from '../const/error.const';

class AuthController {
  async registerUser(req: Request, res: Response) {
    try {
      const username = req.body.username;
      const email = req.body.email;
      const password = req.body.password;

      const savedUser = await authService.registerUser({
        username,
        email,
        password,
      });

      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const username = req.body.username;
      const userPassword = req.body.password;

      const loggedInUser = await authService.loginUser(username, userPassword);

      res.status(200).json(loggedInUser);
    } catch (error) {
      let code = 500;

      if (error instanceof Error && error.message === ErrorMessage.invalidUsernameOrPassword) {
        code = 401;
      }

      res.status(code).json(error);
    }
  }
}

export const authController = new AuthController();
