import express from 'express';
import usersRouter from '../router/users-router';

const app = express();

app.use(express.json);
app.use(express.urlencoded({ extended: true }));

app.use(usersRouter);

usersRouter.get('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    res.status(StatusCodes.CREATED).send({ uuid });
});

app.listen(3000, () => {
    console.log('aplicação executando na porta 3000');
});