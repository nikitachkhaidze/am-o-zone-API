import { Router } from 'express';
import AES from 'crypto-js/aes';
import { QueryConfig } from 'pg';
import { verifyAuthorization } from './verify-authorization';
import { User } from '../types/user.interface';
import { pool } from '../index';

const router = Router();
const passwordSecret = process.env.PASSWORD_SECRET ?? '';

router.put('/:id', verifyAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = AES.encrypt(req.body.password, passwordSecret).toString();
  }

  try {
    const query: QueryConfig = {
      text: 'UPDATE "user" SET username = $1, email = $2, password = $3 WHERE id = $4',
      values: [req.body.username, req.body.email, req.body.password, req.params.id],
    };
    const userQueryResult = await pool.query<User>(query);
    const updatedUser = userQueryResult.rows[0];

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export default router;
