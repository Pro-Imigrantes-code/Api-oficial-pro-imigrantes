import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const SECRET_KEY = 'Chapeco2022@';

interface JwtPayloadInterface {
  username: string;
}

interface AuthRequest extends Request {
  user?: JwtPayloadInterface;
}


const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const tokenHeader = req.headers['authorization'];
  const token = tokenHeader && tokenHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ erro: 'Falha ao autenticar o token' });
    }
    const decodedPayload = decoded as JwtPayloadInterface;
    req.user = { username: decodedPayload.username };
    next();
  });
};

export { AuthRequest, authMiddleware };
