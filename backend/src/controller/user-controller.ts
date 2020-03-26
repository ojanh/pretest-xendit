import { DatabaseController } from "./database-controller";
import { getKnex } from "../config";
import Knex from 'knex';
import * as mysql from 'mysql';

export class UserController extends DatabaseController {
    authController: any;
    response: any;
    db: mysql.Connection;
    knex: Knex<any, any>;
    
    constructor(db: mysql.Connection, authController: any,response?: any) {
        super(db)
        this.db = db;
        this.authController = authController;
        this.response = response;
        this.knex = getKnex()
    }

    checkUsername(username: any, password: any, whenOK=(r: any)=>{},  
        whenBadInput=(e: any)=>{}, whenError=(e: any)=>this.whenDBError(this.response, e)){
        

        this.db.query(`SELECT username,name FROM users  WHERE username="${username}" AND password=SHA2('${password}',256)`, 
        (err: any,res: any[])=> {
            if (err){
                whenError(err)
            } else if (res.length <= 0){
                whenBadInput(res)
            } else {
                whenOK(res[0])
            }
        })
    }

    setLogin(username: any, 
        whenOK=(r: any)=>{}, 
        whenError=(res: any, e: any)=>this.unauthorizedError(this.response, e)){
            
        this.db.query(`UPDATE users SET is_login=true WHERE username="${username}"`, (err: any,res: { sqlMessage: any; })=>{
            if (err){
                whenError(this.response, 'Something wrong. maybe it\'s your username or password')
            } else {
                whenOK(res.sqlMessage)
            }
        })
    }


}

