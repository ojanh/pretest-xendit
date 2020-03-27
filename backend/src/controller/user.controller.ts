import { DatabaseController } from "./database.controller";
import { getKnex } from "../config";
import UserRepository from "../repository/user.repository";
import { Request, Response, Next } from "restify";

export class UserController extends DatabaseController {

    private repo: UserRepository;

    constructor(userRepository = new UserRepository()){
        super();
        this.repo = userRepository;
    }

    login(req: Request, res:Response, next: Next){
        let data = req.body

        this.repo.login(data.email, data.password).then((response)=>{
            
            
            if (response.length <= 0){
                this.unauthorizedError(res, 'User Not Found')
            } else {
                this.whenDBSucess(res, 'OK');
            }
        }, err => {
            this.whenDBError(res, err)
        })
        
    }

    register(req: Request, res:Response, next: Next) {
       
        let data = req.body;
        this.repo.checkUsers(data.email || '').then(userList => {
            if (userList.length > 0){
                this.whenBadRequest(res, 'User has Been registered');
            } else {
                this.repo.register(data as any).then(response =>{
                    this.whenDBSucess(res, 'User Registration Success')
                }, error => {
                    this.whenDBError(res, error);
                })
            }
        })
    }
}