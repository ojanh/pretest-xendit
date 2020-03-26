import { Response } from "restify";
import { graphql } from "graphql";
import { DBGraphqlSchema } from "../graphql/base.graphql";
import Knex from 'knex';

export class DatabaseController {
    
    constructor(db:any) {
    
    }

    whenDBSucess(responseObject:Response, result:any){
      if (responseObject){
            responseObject.contentType = 'json'
            responseObject.send(200, {'message':'OK', 'result': result})
        }
    }

    whenDBError(responseObject:Response, sqlMessageError:any) {  
        if (responseObject) {
            responseObject.status(500)
            responseObject.send({'message':'ERROR', 'result': sqlMessageError})
        }
    }
    
    parseOneResult(result:any){
        if (result.length === 0){
            return {};
        } else {
            return result[0];
        }
    }

    unauthorizedError(responseObject:Response, err:any){
        console.log(err)
        
        if(responseObject){
            responseObject.send(401, {'message':'ERROR', 'result': err})
        }
    }

    getGraphQL<T=any>(query:string){
        return graphql<T>(DBGraphqlSchema, query)
    }

}
