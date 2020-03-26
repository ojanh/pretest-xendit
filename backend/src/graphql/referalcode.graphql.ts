import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList } from "graphql";

import { ReferalCodeModel, ReferalGetModel } from "../model/referalcode-model";
import { getKnex } from "../config";
import { resolve } from "bluebird";

const knex = getKnex()

export const ReferalGivenCodeQLModel = new GraphQLObjectType({
    name: 'ReferalGiven',
    fields: ()=> ({
        id:{type: GraphQLString},
        user_refer:{type: GraphQLString},
        points: {type:GraphQLInt},
        referal_code:{
            type: (ReferalCodeQLModel),
            resolve: (parent) => knex.select().from('referal_code')
                .where('user_id','=', parent.id).first().then<ReferalCodeModel>(r=>r?r:new ReferalCodeModel())
        },
        who_refer:{
            type:new GraphQLList(ReferalGetCodeQLModel),
            resolve:(parent) => knex.select('rgt.*')
            .from(knex.ref('referal_getrefer').as('rgt'))
            .join(knex.ref('referal_code').as('rc'), bu=>bu.on('rgt.referal_code', 'rc.code'))
            .join(knex.ref('referal_givenrefer').as('rgv'), bu=>bu.on('rgv.id', 'rc.user_id'))
            .where('rgv.id','=',parent.id)
        },
        count:{
            type:GraphQLInt,
            resolve:(parent)=>knex('point_users').select('count').where('id','=',parent.id).first()
                .then(res=>res? res.count : 0)  
        }
})})


export const ReferalCodeQLModel = new GraphQLObjectType({
    name: 'ReferalCode',
    fields: ()=> ({
        id:{type:GraphQLID},
        code:{type:GraphQLString},
        user_id:{type:GraphQLString},
        points:{type:GraphQLInt},
    })})


export const ReferalGetCodeQLModel = new GraphQLObjectType({
    name: 'ReferalGet',
    fields: ()=> ({
        id:{type:GraphQLID},
        user_whorefer:{type:GraphQLString},
        booking_code:{type:GraphQLString},
        referal_code:{type:GraphQLString}   
})})