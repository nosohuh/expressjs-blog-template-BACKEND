import Express,{Request,Response, Router} from 'express'
import { userLoginTemplate } from '../controller/login.ct';
import { limitter } from '../component/rate-limit';
export default (Router:Express.Router)=>{
    Router.post('/login',limitter(1,7),userLoginTemplate)
};