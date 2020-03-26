import { StringSchema, NumberSchema, number } from "joi";
import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList, GraphQLInterfaceType, GraphQLNonNull, GraphQLUnionType, assertInterfaceType } from "graphql";
import { getKnex } from "../config";

const knex = getKnex();

export class ReferalGivenModel {
    id:string = ''
    user_refer:string|StringSchema = '';
    points?:number|NumberSchema = 0   
    who_refer?:ReferalGetModel;
    count?: number = 0;
    referal_code?:ReferalCodeModel|string = ""
    referal_point?:number = 0
}

export class ReferalCodeModel {
    id?:string = ''
    code?:string|StringSchema = ""
    user_id?:ReferalGivenModel|string|StringSchema = ""
    points?:number = 0
}

export class ReferalGetModel {
    id?:string = ""
    user_whorefer?:ReferalGivenModel|string|StringSchema = ""
    booking_code?:string|StringSchema = ""
    referal_code?:ReferalCodeModel|string = ""
}
