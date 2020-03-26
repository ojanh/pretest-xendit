import { DatabaseController } from './database-controller';
import * as Joi from 'joi';
import restify_jwt from 'restify-jwt-community';
import * as jwt from 'jsonwebtoken';


export class AuthController extends DatabaseController {
    secretToken: string;

    constructor(db: any, secretToken:string) {
        super(db)
        this.secretToken = secretToken
        
    }
    
    checkBearer() {
        return restify_jwt({secret: this.secretToken})
    }

    checkBearerForAddPoints(){
        return restify_jwt({secret: this.secretToken+'a1'})
    }

    createToken(data: any){
        let token = jwt.sign({data: JSON.stringify(data)}, this.secretToken, {
            expiresIn: '12h'
        });

        // retrieve issue and expiration times
        let { iat, exp }:any = jwt.decode(token);
        return { iat, exp, token };
    }

    createTokenAddPoints(data=''){
        let token = jwt.sign({data: JSON.stringify(data)}, this.secretToken+'a1', {
            expiresIn: '2m'
        })
        return token
    }
}