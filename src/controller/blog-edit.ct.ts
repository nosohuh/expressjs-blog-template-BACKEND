import Express,{Request,Response} from 'express'
import { statusMessages,statusCode } from '../library/config'
import { Blog, editblog, findBlog } from '../models/blog-models'
import Log_Login from '../component/logs'
import { title } from 'process'
export const editBlogText = async (req:Request,res:Response)=>{
    try {
        const {
            oldtitle, title,textarea } = req.body
        if(!oldtitle || !title || !textarea || typeof oldtitle !== 'string' ||
        typeof title !== 'string' || typeof textarea !== 'string' ){
            Log_Login.info(statusMessages.ValueTypeEmpty,true)
            return res.status(statusCode.TypeWrong).json({
                Message:statusMessages.ValueTypeEmpty,
                EmptyValue: req.body.oldtitle
            })};
        const blogsFind = await findBlog(oldtitle).select('id')
        if(!blogsFind){
            Log_Login.error(statusMessages.BlogNotFind,true)
            return res.status(statusCode.BlogNotFiend).json({
                Message:statusMessages.BlogNotFiend,
                EmptyValue: req.body.oldtitle,
                Value:blogsFind
            })};
        const updateBlog: Blog = {title: title, textarea:textarea}
        const replaceBlog = await editblog(blogsFind?.id, updateBlog)
        if(!replaceBlog){
            Log_Login.error(statusMessages.ValuesNotChanged,true)
            return res.status(statusCode.NotChanged).json({
                Message:statusMessages.ValuesNotChanged
            })};
        return res.status(statusCode.SuccesProcces).json({Message:statusMessages.ValuesChangedSuccess, UpdateValue:updateBlog , Timead: new Date()})
    } catch (error) {
        return res.status(statusCode.TypeWrong).json({Message:statusMessages.ValuesNotChanged})
    }
}