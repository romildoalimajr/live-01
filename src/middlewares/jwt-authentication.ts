import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/errors/forbiddenError.model";
import userRepository from "../repositories/user.repository";
import JWT from 'jsonwebtoken';

function beareAuthenticationMiddleaware(req: Request, res: Response, next: NextFunction) {
    try {
        const authorizationheader = req.headers['authorization'];

        if (!authorizationheader) {
            throw new ForbiddenError('Credenciais não informadas');
        }

        const [authenticationType, token] = authorizationheader.split(' ');

        if (authenticationType !== ' Bearer' || !token) {
            throw new ForbiddenError("Tipo de autenticação inválida");
        }
        const tokenPayload = JWT.verify(token, 'my_secret_key');
        
        if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
            throw new ForbiddenError('Token Inválido');
        }
        //const uuid = tokenPayload.sub;
        //const user = userRepository.findById(uuid);
        const user = {
            uuid: tokenPayload.sub,
            username: tokenPayload.username
        };
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

export default beareAuthenticationMiddleaware;