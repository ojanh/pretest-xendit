import {Router} from 'restify-router';
import { Request, Response } from 'restify';
import  '../controller/user-controller';
import { UserController } from '../controller/user-controller';
import {getDB} from '../config';
import { BaseRouter } from './base-router';

export class LoginRouter extends BaseRouter {
    router: Router;
    userController: any;
    authController: any;

	constructor(db: any, authController: any){
        super()
		this.router = new Router();
		this.userController =  new UserController(getDB(), authController)
		this.authController = authController;
		this.setRouter()
    }

    setRouter(){
       this.router.post('/', this.checkUsername.bind(this))
    }

    checkUsername(req: Request,res:Response,next: any){
        let authent = this.doAuthentication.bind(this)
        let data = req.body
        this.userController.checkUsername(data.username, data.password, (result: any)=>
            this.doAuthentication(result,res,next)
        , ()=> res.send(401, {message:'ERROR', result:'Username or Password Wrong'}))
    }

    
    doAuthentication(result: any,res: Response,next: any){
        let getToken = this.authController.createToken(result)
        res.send(200, getToken)
    }

}
