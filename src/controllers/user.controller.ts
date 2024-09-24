import { Request, Response } from 'express';
import { userService } from '../services/user.service';

class UserController {
  async updateUser(req: Request, res: Response) {
    try {
      const username = req.body.username;
      const email = req.body.email;
      const password = req.body.password;

      const updatedUser = await userService.updateUser({ username, email, password });

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

export const userController = new UserController();
