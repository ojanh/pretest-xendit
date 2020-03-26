import { LoginRouter } from './routes/login-router';
import { AuthController } from './controller/auth-controller';
import {createServer, plugins} from 'restify';
import { Router } from 'restify-router';
import {getDB} from './config';
import { ReferalCodeRouter } from './routes/referalcode-router';
import  * as config from "./config";
import corsRestify from 'restify-cors-middleware';
import {graphiqlRestify, graphqlRestify} from 'apollo-server-restify';
import { DBGraphqlSchema } from './graphql/base.graphql';


const router = new Router();
const server = createServer({
	name: 'api',
	version: '1.0.0'
});
const corsMiddleWare = corsRestify({
	preflightMaxAge: 5, //Optional
	origins: ['http://localhost:3000'],
	allowHeaders: ['API-Token', 'Authorization'],
	exposeHeaders: ['API-Token-Expiry']
})

//Controller Module
const db = getDB()
const authController = new AuthController(db, config.secretToken||'')

//Router Module
const referalCodeRouter = new ReferalCodeRouter(db, authController)
const userRouter = new LoginRouter(db, authController)

//Server
server.pre(corsMiddleWare.preflight)
server.use(corsMiddleWare.actual)
server.use(plugins.throttle({
	burst: 100,  	// Max 10 concurrent requests (if tokens)
	rate: 2,  		// Steady state: 2 request / 1 seconds
	ip: true,		// throttle per IP
}));
server.use(plugins.jsonBodyParser());
server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser());
server.use(plugins.gzipResponse());

if (process.env.IS_DEV){
	server.get('/graphql', graphqlRestify({schema: DBGraphqlSchema}))
	server.post('/graphql',graphqlRestify({schema: DBGraphqlSchema}))
	server.get('/graphqlide', graphiqlRestify({endpointURL: '/graphql'}))
}

//test DB
db.connect(err=>{
    if (err) {
        console.log('Database error: '+err);
        server.close()
    }
});

//Router 
router.get('/', (req,res,next)=>{
	res.send(200, 'Hello')
});
router.add('/referalcode', referalCodeRouter.router);
router.add('/login', userRouter.router)
router.applyRoutes(server);

server.on('uncaughtException', (req, res, route, err) => {
	res.send(500, {'message':'ERROR', 'result':'Internal Server error'})
	
});
server.on('restifyError', (req, res, err, next)=>{
	if (err['code']=='Unauthorized'){
		res.status(401)
	} else if (err['status']) {
		res.status(err['status'])
	} else {
		res.status(500)
	}
	res.send({'message':'ERROR', 'result':err.message})
})
server.listen(process.env.PORT||8080,()=> {
	console.log('Server is listening');
	
})