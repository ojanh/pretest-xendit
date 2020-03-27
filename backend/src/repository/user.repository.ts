import { getKnex } from "../config"
import { UserModel } from "../type/user.type";

export default class UserRepository {
    
    private knex: ReturnType<typeof getKnex>;
    
    constructor(knex = getKnex()){
       this.knex = knex;
    }

    login(username, password) {
        return this.knex('users').select('email').where('email', username)
            .andWhereRaw('pass=cast(sha256(?) as text)',[password])
    }

    register(data: UserModel) {
        const {email, password} = data;

        return this.knex.raw(
            `insert into users values (gen_random_uuid(), ?, sha256(?))`, [email, password]);
    }

    checkUsers(email: string) {
        return this.knex('users').select('*').where('email', email)
    }
}