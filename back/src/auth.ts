import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
require('dotenv').config();

const auth = async (req: Request, res: Response) => {
  const { authorization } = req.headers;
  if (!authorization) res.status(400).json({ result: false, errorMessage: '로그인 후 사용하시오' });

  const [tokenType, tokenValue] = authorization!.split(' ');

  if (tokenType !== 'Bearer') {
    res.status(401).json({
      result: false,
      errorMessage: '로그인 후 사용하시오',
    });
  }

  try {
    res.locals.user = await jwt.verify(tokenValue, process.env.TOKEN_SECRET_KEY!);
  } catch (error) {
    res.status(401).json({
      result: false,
      errorMessage: '로그인 후 사용하시오',
    });
  }
};

export default auth;
