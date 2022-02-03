import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/errors/forbiddenError.model";
import userRepository from "../repositories/user.repository";

async function basicAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authorizationheader = req.headers['authorization'];

        if (!authorizationheader) {
            throw new ForbiddenError('Credenciais não informadas');
        }
        const [authenticationType, token] = authorizationheader.split(' ');
        if (authenticationType !== 'Basic' || !token) {
            throw new ForbiddenError('Tipo de autenticação válida');
        }
        const tokenContent = Buffer.from(token, 'base64').toString('utf-8');

        const [username, password] = tokenContent.split(':');

        if (!username || !password) {
            throw new ForbiddenError('Credenciais não preenchidas');
        }
        const user = await userRepository.findByUserNameAndPassword(username, password);
        if (!user) {
            throw new ForbiddenError("Usuário ou senha inválidos");
        }
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

export default basicAuthenticationMiddleware;