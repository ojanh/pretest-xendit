import supertest from 'supertest';
import server from '../src/app';
import UserRepository from "../src/repository/user.repository";
import mockDb from "mock-knex";
import knex from "knex";

describe('login repo unit', () => {
    let repo: UserRepository;

    beforeEach(()=>{
        let knexBuilder = knex({
            client: 'pg'
        });
        mockDb.mock(knexBuilder);

        repo = new UserRepository(knexBuilder);
    })

    it('when user and password is match will return array length 1', ()=>{
       let tracker = mockDb.getTracker();
        tracker.install();

        tracker.on('query', (query)=>{
            query.response([{username: ''}])
        })
       
       repo.login('', '').then(res => {
           expect(res.length).toEqual(1);
           tracker.uninstall();
       })
    })
    
    it('when db error it will catch error', ()=>{
        let tracker = mockDb.getTracker();
         tracker.install();
 
         tracker.on('query', (query)=>{
             query.reject(new Error());
         })
        
        repo.login('', '').catch(e => {
            expect(e).toMatch('error');
            tracker.uninstall();
        })
     })

     it('when user and password is not match will return array length 0', ()=>{
        let tracker = mockDb.getTracker();
         tracker.install();
 
         tracker.on('query', (query)=>{
             query.response([])
         })
        
        repo.login('', '').then(res => {
            expect(res.length).toEqual(0);
            tracker.uninstall();
        })
     })
})

describe('login e2e', () => {
    let app: ReturnType<typeof supertest.agent>;

    beforeEach(()=> {
        app = supertest.agent(server);
    })

    it('when user and password match should return 200', ()=>{
        app.post('/login')
            .send({
                "email": "coba@gmail.com",
                "password": "cobadu123"
        }).then(({body, status})=>{
            expect(status).toEqual(200);
        })

        
    })
    
    it('when user and password not match should return 401', ()=>{
        app.post('/login')
            .send({
                "email": "coba@gmail.com",
                "password": "cobadu1123"
        }).then(({body, status})=>{
            expect(status).toEqual(401);
        })

        
    })
})