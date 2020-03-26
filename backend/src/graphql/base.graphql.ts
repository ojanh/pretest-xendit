
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLFieldConfigArgumentMap } from "graphql";
import { getKnex } from "../config";
import { ReferalGivenCodeQLModel, ReferalCodeQLModel } from "./referalcode.graphql";

const knex = getKnex()
const argsPagination:GraphQLFieldConfigArgumentMap = {
    page:{type:GraphQLInt, defaultValue: 0},
    limit: {type:GraphQLInt, defaultValue:10}
}

const Query = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        referalGivenList: {
            type: new GraphQLList(ReferalGivenCodeQLModel),
            args: {...argsPagination},
            resolve(p,args){
                return knex.select().from('referal_givenrefer')
                    .offset(args.limit*args.page)
                    .limit(args.limit)
            }
        },
        referalGetList: {
            type: new GraphQLList(ReferalCodeQLModel),
            resolve(){
                return knex.select().from('referal_getrefer')
            }
        },
        referalGivenDetail: {
            type: ReferalGivenCodeQLModel,
            args: {
                id: {type: GraphQLString, defaultValue:1}
            },
            resolve:(parent,args)=>{
                return knex.select().from('referal_givenrefer').where('id','=', args.id).first()
            }
        }
    },
})

export const DBGraphqlSchema = new GraphQLSchema({
    query: Query
})
