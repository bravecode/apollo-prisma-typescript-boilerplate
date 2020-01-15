import { AuthenticationError } from 'apollo-server';
import * as jwt from 'jsonwebtoken';
import { User } from '../codegen';

export const getUser = (req): string => {
    const { authorization } = req.headers;
  
    if (!authorization) {
        throw new AuthenticationError('Authorization token missing.');
    }
  
    const token: string = authorization.replace('Bearer ', '');
    const user: Partial<User> | string = jwt.verify(token, 'Secret');
  
    if (!user || typeof user !== 'object') {
        throw new AuthenticationError('Authorization token invalid.');
    }

    return user.id;
};