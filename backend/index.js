import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from 'path';

dotenv.config({});

const app = express();
const __dirname = path.resolve();

// middleware
if(process.env.NODE_ENV !== 'development'){
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}
}

app.use(cors());
const PORT = process.env.PORT || 3000;


// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

if(process.env.NODE_ENV !== 'development'){
    app.use(express.static(path.join(__dirname,'../frontend/build')))

    app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../frontend/build/index.html'))
    });
}

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})