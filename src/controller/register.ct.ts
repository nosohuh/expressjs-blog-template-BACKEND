import { Response,Request, Router } from "express";
import Log_Login from "../component/logs";
import { statusMessages,statusCode } from "../library/config";
import { User, mailFind, userAdd, userFind } from "../models/blog-models";
export const bcrypt = require("bcrypt")

export const userRegister = async (req:Request,res:Response)=>{
    const {
        username,
        email,
        password
    } = req.body;
    try{
        if(!username || !email || !password || typeof password !== 'string' || 
        typeof username !== 'string' || typeof email !== 'string'){
            console.log("1")
            Log_Login.error(statusMessages.InvalidValues,true)
            return res.status(statusCode.MemberRegisterFailed).json({
                Message:statusMessages.InvalidValues
            })};
        const userSearch = await userFind(username)
        if(userSearch){
            console.log("2")
            Log_Login.error(statusMessages.RegisterCurrentValue,true)
            return res.status(statusCode.CurrentValue).json({
                Message:statusMessages.RegisterCurrentValue
            })};
        const emailSearch = await mailFind(email)
        if(emailSearch){
            console.log("3")
            Log_Login.error(statusMessages.RegisterCurrentValue,true)
            return res.status(statusCode.CurrentValue).json({
                Message:statusMessages.RegisterCurrentValue
            })};
        const hashPassword = await bcrypt.hash(password,10)
        const userProfil: User = {username:username, email:email, password:hashPassword}
        const userAppend = await userAdd(userProfil)
        if(!userAppend){
            console.log("4")
            Log_Login.warn(statusCode.MemberRegisterFailed,true)
            return res.status(statusCode.MemberRegisterFailed).json({
                Message:statusMessages.RegisterFailed,
                Output:{
                    userProfil
                }})};
            return res.status(statusCode.RegisterSuccess).json({Message:statusMessages.UserSuccessRegister, Output:userProfil})
    }
    catch(err){
        return res.status(statusCode.TypeWrong).json({Message:statusMessages.RegisterFailed})
    }
}