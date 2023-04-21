import Express, { Router } from "express";
import blogAdd from "./blog-add";
import blogDel from "./blog-del";
import blogEdit from "./blog-edit";
import register from "./register";
import login from "./login";

const router = Express.Router();
export default (): Express.Router => {
    blogAdd(router);
    blogDel(router);
    blogEdit(router);
    register(router);
    login(router)
    return router;
};