import { Request, Response, NextFunction } from 'express';
require('dotenv').config();

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  console.log('req.headers === ', req.headers);
  if (!authorization)
    return res.status(400).json({ result: false, message: '접근권한이 없습니다. 로그인 후 사용하세요.' });

  const [tokenType, tokenValue] = authorization.split(' ');

  if (tokenType !== 'Bearer') {
    return res.status(401).json({
      result: false,
      message: '접근권한이 없습니다. 로그인 후 사용하세요.',
    });
  }

  try {
    req.sessionID === tokenValue
      ? next()
      : res.status(401).json({
          result: false,
          message: '접근권한이 없습니다. 로그인 후 사용하세요.',
        });
  } catch (error) {
    return res.status(401).json({
      result: false,
      message: '접근권한이 없습니다. 로그인 후 사용하세요.',
    });
  }
};

export default auth;
