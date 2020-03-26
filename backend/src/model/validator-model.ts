import { ReferalGivenModel, ReferalGetModel, ReferalCodeModel } from "./referalcode-model";
import Joi from 'joi';


export namespace ValidateRequest {
	type Validation<T extends {[key:string]:any}> = {
        body?:{[key in keyof T]?:Joi.Schema},
		query?:{[key in keyof T]?:Joi.Schema},
	}


    export const addReferalGiven:
        Validation<ReferalGivenModel> = {
        body:{
            points:Joi.number(),
			user_refer:Joi.string().required(),
			referal_code:Joi.string().required(),
			referal_point:Joi.number().required()
        }
	}

    export const checkReferal:Validation<any> = {
		query:{
			referal_code: Joi.string().required(),
			username: Joi.string().email().required()
		}
	}
	export const addreferalGetter:Validation<ReferalGetModel> = {
		body:{
			user_whorefer: Joi.string().required(),
			booking_code:  Joi.string().required(),
			referal_code: Joi.string().required()
		}
	}
	
}