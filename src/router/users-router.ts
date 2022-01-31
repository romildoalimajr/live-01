import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from 'http-status-codes';
import userRepository from "../repositories/user.repository";

const usersRouter = Router();

usersRouter.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers(); //[{ userName: "Romildo" }];
    res.status(StatusCodes.OK).send(users);
});

usersRouter.get('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
        const uuid = req.params.uuid;
        const user = await userRepository.findById(uuid);
        res.status(StatusCodes.CREATED).send({ uuid });   
    } catch (error) {
        next(error);
    }
});

usersRouter.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;

    const uuid = await userRepository.create(newUser);
    res.status(StatusCodes.CREATED).send(newUser);
});

usersRouter.put('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifieUser = req.body;

    modifieUser.uuid = uuid;

    await userRepository.update(modifieUser);

    res.status(StatusCodes.OK).send();
});

usersRouter.delete('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    await userRepository.remove(uuid);
    res.status(StatusCodes.OK);
});

export default usersRouter;