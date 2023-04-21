import Express,{Request,Response, Router} from 'express'
import { userRegister } from '../controller/register.ct';
import { limitter } from '../component/rate-limit';
export default (Router:Express.Router)=>{
    Router.post('/register',limitter(1,5),userRegister)
};