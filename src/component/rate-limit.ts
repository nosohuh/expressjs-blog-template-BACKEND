import { rateLimit } from "express-rate-limit";
export const limitter = (minutes:number,limit:number)=>{
   return rateLimit({
        windowMs: minutes * 60 * 1000,
        max:limit,
        standardHeaders:true,
        legacyHeaders:false,
        statusCode:404
        
    })
};