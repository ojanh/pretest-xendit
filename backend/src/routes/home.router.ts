
import { Router } from "restify-router";
import { UserController } from "../controller/user.controller";
import { Request, Response } from "restify";


const userController = new UserController();

export default function homeRouter() {
    let router = new Router();

    router.get('/', helloReturn);
    router.post('/login', userController.login.bind(userController));
    router.post('/register', userController.register.bind(userController));
    return router;
}

const helloReturn = (req: Request, res: Response) => {
    res.send(200, 'hello');
}