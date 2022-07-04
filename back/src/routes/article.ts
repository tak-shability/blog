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

router.get('/articles/show', async (req, res) => {
  try {
    await db.query('select id, title from articles', (error: string, result: { id: number; title: string }) => {
      res.status(200).json({
        result: true,
        main: result,
      });
    });
  } catch (error) {
    res.json(401).json({
      result: false,
      message: 'error occured during the inquire',
    });
  }
});

router.get('/articles/:article/show', async (req, res) => {
  try {
    await db.query(
      'select * from articles where id=?',
      req.params.article,
      (error: string, result: { id: number; title: string; contents: string }) => {
        res.status(200).json({
          result: true,
          detail: result,
        });
      },
    );
  } catch (error) {
    res.json(401).json({
      result: false,
      message: 'error occured during the inquire',
    });
  }
});

export default router;
