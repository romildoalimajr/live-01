import { Request, Response, NextFunction, Router } from 'express';
import ForbiddenError from '../models/errors/forbiddenError.model';
import JWT from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import basicAuthenticationMiddleware from '../middlewares/basic-authentication.middleware';

const authorizationRoute = Router();

authorizationRoute.post('/token', basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
        throw new ForbiddenError('Usuário não informado');
    }
    try {
        const jwtPayload = { username: user.username };
        const jwtOption = { subject: user?.uuid };
        const secretKey = 'my_secret_key';
        const jwt = JWT.sign(jwtPayload, secretKey, jwtOption);

        res.status(StatusCodes.OK).json({ token: jwt });

    } catch (error) {
        next(error);
    }
});

export default authorizationRoute;

