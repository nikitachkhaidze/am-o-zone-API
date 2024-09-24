import { Router } from 'express';
import AES from 'crypto-js/aes';
import { verifyAuthorization } from './verify-authorization';
import { knex } from '../index';

const router = Router();
const passwordSecret = process.env.PASSWORD_SECRET ?? '';

router.put('/:id', verifyAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = AES.encrypt(req.body.password, passwordSecret).toString();
  }

  try {
    const updatedUser = await knex('user')
      .where('id', req.params.id)
      .update({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      })
      .returning(['username', 'email'])
      .first();

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export default router;
