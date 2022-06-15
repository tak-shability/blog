import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
require('dotenv').config();

const auth = async (req: Request, res: Response) => {
  const { authorization } = req.headers;
  if (!authorization) res.status(400).json({ result: false, message: '접근권한이 없습니다. 로그인 후 사용하세요.' });

  const [tokenType, tokenValue] = authorization!.split(' ');

  if (tokenType !== 'Bearer') {
    res.status(401).json({
      result: false,
      message: '접근권한이 없습니다. 로그인 후 사용하세요.',
    });
  }

  try {
    res.locals.user = await jwt.verify(tokenValue, process.env.TOKEN_SECRET_KEY!);
  } catch (error) {
    res.status(401).json({
      result: false,
      message: '접근권한이 없습니다. 로그인 후 사용하세요.',
    });
  }
};

export default auth;
