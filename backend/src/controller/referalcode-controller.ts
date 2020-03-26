import { ReferalGetModel, ReferalGivenModel } from './../model/referalcode-model';
import { DatabaseController } from './database-controller';
import { Response } from 'restify';
import { getKnex} from '../config';
import Knex from 'knex';

export class ReferalCodeController extends DatabaseController {
    knex: Knex<any, any>;
    
    constructor(db:any) {
        super(db)
        this.knex = getKnex()
    }

    getReferalCode(page:number=0, limit:number=10){
       return this.getGraphQL(`{
        referalGivenList(page: ${page||0}, limit:${limit||10}){
            id
            user_refer
            points
            who_refer{
              user_whorefer
              booking_code
              referal_code
            }
            count
            referal_code{
              code
              points
            }
        }
      }`)
    }

    getDetailReferalCode(id: any){
        return this.getGraphQL(`{
            referalGivenDetail(id: "${id||''}"){
                id
                user_refer
                points
                who_refer{
                  user_whorefer
                  booking_code
                  referal_code
                }
                count
                referal_code{
                  code
                  points
                }
            }
        }`)
    }

    checkReferalCode(refer_code: any){
        return this.knex.select('rgv.id as referal_user', 'rc.code as code')
            .from(this.knex.ref('referal_givenrefer').as('rgv'))
            .leftJoin(this.knex.ref('referal_code').as('rc'), build=>build.on('rgv.id','rc.user_id'))
            .where('rc.code', refer_code)
    }
    
    checkHasBeenUsed(username: any){
        return this.knex.select('rgt.user_whorefer').from(this.knex.ref('referal_getrefer').as('rgt'))
            .where('rgt.user_whorefer', username).first()
    }

    addReferalCodeGiven(body:ReferalGivenModel) {
        return this.knex('referal_givenrefer')
            .insert({
                id: this.knex.raw('UUID()'),
                points: 0,
                user_refer: body.user_refer
            }).then(r=>{
                return this.knex.select('id')
                    .from('referal_givenrefer')
                    .where('user_refer','=', body.user_refer as string).first()
            }).then(r=>{
                
                return this.knex('referal_code').insert({
                    id: this.knex.raw('UUID()'),
                    code: body.referal_code,
                    user_id: r.id,
                    points: body.referal_point
            })
        })
    }

    addReferalCodeWhoGet(body:ReferalGetModel){
        return this.knex('referal_getrefer').insert({
            id:this.knex.raw('UUID()'),
            user_whorefer: body.user_whorefer,
            booking_code: body.booking_code,
            referal_code: body.referal_code
        }).then(()=>{
            return this.knex.select('id', 'count', 'points', 'referal_code', 'referal_point').from('point_users')
                .where('referal_code','=', body.referal_code as string).first()
        }).then(re1=>{
            if (re1){
                return this.knex('referal_givenrefer').update({
                    points: re1.points + re1.referal_point
                }).where('id', '=', re1.id)
            } else {
                return {};
            }
        })
    }

    updateReferalCodeGiven(id: any, data: ReferalGivenModel){
        return this.knex('referal_givenrefer')
            .update({
                user_refer: data.user_refer
            }).where('id','=', id)
            .then(r=>{
                return this.knex.select('id')
                    .from('referal_givenrefer')
                    .where('user_refer','=', data.user_refer as string).first()
            }).then(r=>{
                return this.knex('referal_code').update({
                    code: data.referal_code,
                    points: data.points
            }).where('user_id', '=', id)
    })
                
    }

    deleteReferalCodeGiven(id: any,res: Response){
        return this.knex('referal_givenrefer').where('id', id)
            .del().catch((e: { sqlMessage: any; })=>this.whenDBError(res,e.sqlMessage))
            .then((r: any)=>this.whenDBSucess(res, 'Data has been deleted'))
    }
}
