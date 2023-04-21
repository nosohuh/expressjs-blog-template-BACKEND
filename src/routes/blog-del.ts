import Express, { Router } from "express";
import { deleteBlog } from "../controller/blog-del.ct";
import { limitter } from "../component/rate-limit";
export default (router: Express.Router) => {
    router.post('/delete-blog',limitter(1,15),deleteBlog)
};