import  Express, {Router}  from "express";
import { createBlog } from "../controller/blog-add.ct";
import { limitter } from "../component/rate-limit";
export default ( router: Express.Router) =>{
    router.post('/blog-add',limitter(1,5), createBlog);
};