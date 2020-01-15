import * as jwt from 'jsonwebtoken';
import { User } from '../codegen';

export const getUser = (req): string => {
    const { authorization } = req.headers;
  
    if (!authorization) 
        throw new Error('Token not found.');
  
    const token: string = authorization.replace('Bearer ', '');
    const user: Partial<User> | string = jwt.verify(token, 'Secret');
  
    if (!user || typeof user !== 'object')
        throw new Error('Invalid token.');

    return user.id;
};