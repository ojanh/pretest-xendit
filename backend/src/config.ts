
import { config } from 'dotenv';
import  * as mySQL from 'mysql';
import {Sequelize} from 'sequelize';
import knex from 'knex';
import { any } from 'bluebird';

config()
export function getDB(){
    let URL_DB = process.env.URL_DB
    let USERNAME_DB = process.env.USERNAME_DB
    let PASS_DB = process.env.PASS_DB
    let DB = process.env.NAME_DB

    return mySQL.createConnection({host: URL_DB, user: USERNAME_DB, password: PASS_DB, database: DB})
}

export function getDBSequelize(){
    let URL_DB = process.env.URL_DB as string
    let USERNAME_DB = process.env.USERNAME_DB as string
    let PASS_DB = process.env.PASS_DB as string
    let DB = process.env.NAME_DB as string
    
    return new Sequelize(DB, USERNAME_DB, PASS_DB, {
        host: URL_DB,
        dialect: 'mysql'
    })
}
export function getKnex(){
    let URL_DB = process.env.URL_DB
    let USERNAME_DB = process.env.USERNAME_DB
    let PASS_DB = process.env.PASS_DB
    let DB = process.env.NAME_DB

    return knex<any,any>({
        client: 'mysql',
        connection: {
          host : URL_DB,
          user : USERNAME_DB,
          password : PASS_DB,
          database : DB
        }
    })
}

export const secretToken = process.env.TOKEN



