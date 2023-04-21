import  Express,{ Router } from "express";
import { editBlogText } from "../controller/blog-edit.ct";
import { limitter } from "../component/rate-limit";
export default(Router:Express.Router)=>{
    Router.put('/edit-blog',limitter(1,10),editBlogText)
};