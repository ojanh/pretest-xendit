import {createServer, plugins} from 'restify';
import { Router } from 'restify-router';
import  * as config from "./config";
import corsRestify from 'restify-cors-middleware';
import {graphiqlRestify, graphqlRestify} from 'apollo-server-restify';
import { UserController } from "./controller/user.controller";
import UserRepository from "./repository/user.repository";
import homeRouter from "./routes/home.router";


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


//Router 

const router = new Router();

router.add('/', homeRouter());
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