import {Request,Response} from 'express'
import Log_Login from '../component/logs'
import {  UserModels, userFind } from '../models/blog-models'
import { statusCode,statusMessages } from '../library/config'
import { bcrypt } from './register.ct'
import { Hash } from 'crypto'
const jwt = require("jsonwebtoken")


export const userLoginTemplate = async (req:Request,res:Response) => {
    const {username, password} = req.body
    try{
        if(!username || !password || typeof username !== 'string' || 
        typeof password !== 'string'){
            console.log('1')
            Log_Login.error(statusMessages.InvalidValues,false)
            return res.status(statusCode.CurrentValue).json({
                Message:statusMessages.InvalidValues
            })};
        const useSearchController = await userFind(username);
        if(!useSearchController){
            console.log('2')
            Log_Login.info(statusMessages.UserNotFound + username , false)
            return res.status(statusCode.NotChanged).json({
                Message:statusMessages.UserNotFound
            })};
        const userCompareCrypto = await bcrypt.compare(password,useSearchController.password)
        if(!userCompareCrypto){
            console.log('3')
            Log_Login.warn(statusCode.TypeWrong,false)
            return res.status(statusCode.TypeWrong).json({
                Message:statusMessages.HashNotDecoded
            })};
        let userData = {
            id:useSearchController.id,
            username:useSearchController.username,
            email:useSearchController.email
        };
        return res.status(statusCode.SuccesProcces).json({Message:statusMessages.UserLoginSuccess, Users:userData})
    }
    catch(err){
        return res.json({Message:'Login başarisiz' + err})
    }
}