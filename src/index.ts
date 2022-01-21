import express from 'express';
import statusRoute from './router/status-router';
import usersRouter from "./router/users-router";

const app = express();
//configuração da aplicação
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//configuração de rotas
app.use(statusRoute);
app.use(usersRouter);

app.listen(3000, () =>{
    console.log('Aplicação escutando na porta 3000');
}) 