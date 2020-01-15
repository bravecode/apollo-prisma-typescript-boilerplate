import { hash, compare } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { getUser } from '../../utils/auth';
import { User } from '../../codegen';

export default {
    Query: {
        me: async (_, __, { req, prisma }) => {
            const userID: string = getUser(req);

            return prisma.user({ id: userID });
        }
    },
    Mutation: {
        signUp: async (_, { name, email, password }, { prisma }) => {
            const securePassword: string = await hash(password, 10);
            const user: User = await prisma.createUser({
                name,
                email,
                password: securePassword
            });

            return {
                ...user,
                token: jwt.sign({ id: user.id }, 'Secret')
            }
        },
        signIn: async (_, { email, password }, { prisma }) => {
            const user: User = await prisma.user({
                email
            });

            if (!user) {
                throw new Error('User not found.');
            }

            const isValid: boolean = await compare(password, user.password);

            if (!isValid) {
                throw new Error('Invalid password.');
            }

            return {
                ...user,
                token: jwt.sign({ id: user.id }, 'Secret')
            }
        }
    }
}