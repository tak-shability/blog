require('dotenv').config();
import express from 'express';
import db from '../DBindex';
import auth from '../auth';

const router = express.Router();

router.post('/articles/post', auth, async (req, res) => {
  const { title, contents } = req.body;
  try {
    await db.query(
      'insert into articles(title, contents) values (?, ?)',
      [title, contents],
      (error: string, result: string) => {
        res.status(201).json({
          result: true,
        });
      },
    );
  } catch (error) {
    res.json(401).json({
      result: false,
      message: 'error occured during insert into database',
    });
  }
});

export default router;
