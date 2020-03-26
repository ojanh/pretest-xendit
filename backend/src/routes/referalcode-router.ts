
import { AuthController } from '../controller/auth-controller';
import { ReferalCodeController } from '../controller/referalcode-controller';


import validation from 'restify-api-validation';
import  * as Joi from 'joi';
import {BaseRouter} from './base-router';
import { Router } from 'restify-router';
import { Request, Response, Next } from 'restify';
import { ValidateRequest } from '../model/validator-model';

export class ReferalCodeRouter extends BaseRouter {
	router: Router;
	controller: ReferalCodeController;
	authController: AuthController;
	

	constructor(db: any, authController: any){
		super()
		this.router = new Router();
		this.controller =  new ReferalCodeController(db)
		this.authController = authController;
		this.setRouter()
		
	}
	
	setRouter() {
		this.router.get('/', this.authController.checkBearer(), this.getReferalCode.bind(this)) 
		this.router.get('/detail/:id', this.authController.checkBearer(), this.getDetailReferalCode.bind(this))
		this.router.get('/checkreferal', validation(ValidateRequest.checkReferal), 
			this.checkReferalCode.bind(this))

		this.router.post('/referalgiven', this.authController.checkBearer(), 
			validation(ValidateRequest.addReferalGiven), this.addReferalCodeGiven.bind(this))
		this.router.put('/referalgiven/:id', this.authController.checkBearer(), 
			validation(ValidateRequest.addReferalGiven), this.editReferalCodeGiven.bind(this))
		this.router.del('/referalgiven/:id', this.authController.checkBearer(), this.deleteReferalCodeGiven.bind(this))
		
		this.router.post('/referalget', this.authController.checkBearerForAddPoints(), validation(ValidateRequest.addreferalGetter), this.addReferalCodeGetter.bind(this))
		
	}

	getReferalCode(req:Request,response: Response,next:Next){
		let query = req.query
		this.controller.getReferalCode(query.page, query.limit).then(r=>{
			this.whenSuccess(response, r.data.referalGivenList)
		}, e=> this.whenServerError(response, e)) 
		return next();
	}

	getDetailReferalCode(req:Request,res:Response,next:()=>void) {
		this.controller.getDetailReferalCode(req.params.id).then(r=>{
			this.whenSuccess(res, r.data.referalGivenDetail)
		}, e=> this.whenServerError(res, e)) 
		return next()
	}

	addReferalCodeGiven(req:Request,response:Response, next: () => void){
		this.controller.addReferalCodeGiven(req.body)
			.catch(rej=>this.whenServerError(response, rej))
			.then(()=>this.whenSuccess(response, 'User Data and Referal Code Has been added'))
		return next();
	}

	addReferalCodeGetter(req:Request,response:Response, next: () => void){
		this.controller.addReferalCodeWhoGet(req.body)
			.catch(()=>this.controller.whenDBError(response, ''))
			.then(()=>this.whenSuccess(response, 'Referal Code putted'))
		
		next()
	}
	editReferalCodeGiven(req: Request,res: Response ,next:Next){
		this.controller.updateReferalCodeGiven(req.params.id, req.body)
		.catch((e:any)=>this.whenServerError(res, e.sqlMessage))
		.then((r: any)=>this.whenSuccess(res, 'User and Referal Code has been updated'))

		return next()
	}

	deleteReferalCodeGiven(req: Request,res: Response ,next:Next){
		this.controller.deleteReferalCodeGiven(req.params.id, res)
			.catch((e: { sqlMessage: any; })=>this.whenServerError(res,e.sqlMessage))
			.then((r: any)=>this.whenSuccess(res, 'User and Referal Code has been deleted'))

		return next()
	}
	
	checkReferalCode(req: Request,res: Response ,next:Next){
		let token = this.authController.createTokenAddPoints()


		this.controller.checkReferalCode(req.query.referal_code).then((r:any)=>{
			console.log(r);
			
			if (r.length > 0){
				this.controller.checkHasBeenUsed(req.query.username).first().then((r1)=>{
					
					if (!r1){
						this.whenSuccess(res, {code: r[0].code, 'token': token})
					} else  {
						this.whenSuccessButError(res, {
							'error': 'HAS_BEEN_USED',
							'message':'Email and Referal Code has been used'
						})
					}
				})
			} else {
				this.whenSuccessButError(res, {
					'error':'NOT_AVAILABLE', 
					'message':'Referal Code Not Available'
				})
				
			} 
		})
		return next()
	}
}	



