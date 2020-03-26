
import { Request, Response } from 'restify';
export abstract class BaseRouter {


    protected whenSuccess(response: Response, data: any) {
        response.contentType = 'json'
        response.status(200)
        response.send({message: 'OK', result: data})
    }

    protected whenSuccessButError(response: Response, data: any){
        response.status(200)
        response.send({message: 'ERROR', result: data})
    }

    protected whenBadInput(response: Response, data: any){
        response.status(400)
        response.send({message: 'ERROR', result: data})
    }

    protected whenUnauthorized(response: Response, data: any){
        response.status(401)
        response.send({message: 'ERROR', result: data})
    }

    protected whenServerError(response: Response, data: any){
        response.status(500)
        response.send({message: 'ERROR', result: data})
    }

    
}

