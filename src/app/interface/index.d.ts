import { JwtPayload } from 'jsonwebtoken';

// used this to globally declare a user field in express' requests
declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
