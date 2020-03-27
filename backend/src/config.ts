
import { config } from 'dotenv';

import knex from 'knex';
import { any } from 'bluebird';

config()

export function getKnex(){
    let URL_DB = process.env.URL_DB
    let USERNAME_DB = process.env.USERNAME_DB
    let PASS_DB = process.env.PASS_DB
    let DB = process.env.NAME_DB

    return knex<any,any>({
        client: 'pg',
        connection: {
          host : URL_DB,
          user : USERNAME_DB,
          password : PASS_DB,
          database : DB,
          port: 5432
        }
    })
}

export const secretToken = process.env.TOKEN



