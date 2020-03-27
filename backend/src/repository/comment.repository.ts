import { getKnex } from "../config";

export default class CommentRepository {
    
    private knex: ReturnType<typeof getKnex>;

    constructor(){
        this.knex = getKnex();
    }

    postComments(data) {
        return this.knex.insert(data)
    }

}