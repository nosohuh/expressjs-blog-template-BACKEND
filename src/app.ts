import  Express, {Response,Request}  from "express";
import { LocalConfig } from "./library/config";
const cookie = require('cookie-parser')
import routes from "./routes";
import bodyParser from "body-parser";
import { mongooseConnect } from "./models/blog-models";
import mongoose from "mongoose";

const app = Express();


app.use(Express.json())
app.use(Express.urlencoded({extended:true}))
app.use(cookie())
app.use(bodyParser.json())



// Route
app.use(routes())

// Listen
try {
    mongoose.connect(mongooseConnect)
    .then(() => {
        console.log('Mongosse Active')
        app.listen(LocalConfig.PORT, ()=>{console.log('Active', LocalConfig.PORT)})
    }).catch((err) => {
        console.log('err', err)
    });
} catch (error) {
    mongoose.connection.on('Error', (err)=>{
        console.log(err)
    })
}
