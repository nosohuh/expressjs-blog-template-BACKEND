import Express, { Request, Response } from 'express'
import { statusMessages, statusCode } from '../library/config'
import Log_Login from '../component/logs'
import { Blog, dellBlog, findid } from '../models/blog-models'
export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const {
            title
        } = req.body
        if (!title || typeof title !== 'string' || title.length <= 1) {
            console.log('1')
            Log_Login.error(statusMessages.InputTypesError, true)
            return res.status(statusCode.TypeWrong).json({
                Message: statusMessages.InputTypesError
            })
        }
        const findblogId = await findid(title)
        console.log(findblogId)
        if (!findblogId) {
            console.log('2')
            Log_Login.error(statusMessages.BlogNotFind, true)
            return res.status(statusCode.BlogNotFiend).json({
                Message: statusMessages.BlogNotFind
            })
        }
        const deleteBlogs = dellBlog(findblogId?.id)
        if(!deleteBlogs){
            Log_Login.info(statusMessages.BlogDelete,true)
            return res.status(statusCode.BlogNotFiend).json({
                Message: statusMessages.BlogNotFindAndDelete
            })}
        return res.status(statusCode.SuccesProcces).json({Message:statusMessages.BlogDelete, Status: findblogId})
    } catch (error) {
        return res.status(statusCode.BlogNotFiend).json({Message: statusMessages.BlogNotFindAndDelete})
    }
}