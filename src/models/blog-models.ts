import { timeLog, timeStamp } from "console";
import mongoose, { Schema, mongo } from "mongoose";
import { isToken } from "typescript";


export interface User{
    username:string,
    email:string,
    password:string
}
const userScheme:Schema = new Schema ({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    refreshToken:{ type:String},
    CharAt:{
        type: Date, 
        default: Date.now 

    }
})
export interface UserModels  extends User, Document {}
export interface Blog{
    title:string,
    textarea:string
}

export interface BlogModel extends Blog, Document {}
const blogScheme: Schema = new Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    textarea:{
        type:String,
        reuqired:true
    }
})

export const mongooseConnect:string = `mongodb://127.0.0.1:27017/test?retryWrites=true&w=majority`
const blogModel = mongoose.model<Blog>('blogs',blogScheme)
export const blogadd = (value:Partial<Blog>)=> new blogModel(value).save().then((obj)=> obj.toObject())
export const findBlog = (value:string)=> blogModel.findOne({title:value}).select('title')
export const dellBlog = (value:string)=> blogModel.findByIdAndDelete(value).exec()
export const findid = (value:string)=> blogModel.findOne({title:value})
export const editblog = (id:string,title:Partial<Blog>)=> blogModel.findByIdAndUpdate(id,title)
const userModel = mongoose.model<User>('users',userScheme)
export const userFind = (value:string)=> userModel.findOne({username:value})
export const  mailFind = (value:string)=> userModel.findOne({email:value})
export const userAdd = (value:Partial<User>)=> new userModel(value).save().then((obj)=> obj.toObject())
