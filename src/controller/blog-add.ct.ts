import Express, { Request, Response } from "express";
import { statusMessages, statusCode } from "../library/config";
import Log_Login from "../component/logs";
import { findBlog, Blog, blogadd } from "../models/blog-models";
export const createBlog = async (req: Request, res: Response) => {
    try {
        const {
            title,
            textarea,
        } = req.body;
        console.log(typeof title,textarea)
        if (!title || !textarea || typeof title !== 'string' || typeof textarea !== 'string') {
            console.log('1')
            Log_Login.error(statusMessages.InputTypesError, true)
            return res.status(statusCode.TypeWrong).json({
                message: statusCode.TypeWrong
            });
        }
        const blogfind = await findBlog(title)
        if (blogfind) {
            Log_Login.error(statusMessages.InputTypesError, true)
            return res.status(statusCode.ExistingValue).json({
                message: statusCode.ExistingValue
            })
        }

        const blogs: Blog = { title: title, textarea: textarea }
        const createBlogger = await blogadd(blogs)
        if (!createBlogger) {
            Log_Login.info(statusMessages.RegisterFailedToBlogs, true)
            return res.status(statusCode.RegisterFailedtoBlog)
                .json({ Message: statusMessages.RegisterFailedToBlogs })
        }
        Log_Login.info(statusMessages.SuccesBlogRegister + 'For Blogs:'+title,true)
        return res.status(statusCode.SuccesProcces).json({message:statusMessages.SuccesBlogRegister,
        Blog:{title:title, Text:textarea}})
    } catch (error) {
        return res.status(statusCode.TypeWrong).json({
            message: statusCode.TypeWrong, error:error
        });
    }
};