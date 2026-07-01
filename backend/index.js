import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/users.js";
import videoRoute from "./routes/videos.js";
import commentRoute from "./routes/comments.js";
import authRoute from "./routes/auth.js";
import cookieParser from "cookie-parser";


dotenv.config();

const app = express();
app.use(cookieParser());

const connect = async() =>{
    await mongoose.connect(process.env.MONGO).then(()=>{
        console.log("database connected");
    }).catch((err)=>{
        console.log(err);
    });
}

app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/videos", videoRoute);
app.use("/api/comments", commentRoute);
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
    res.send("API is running ");
});

app.use((err , req , res , next) =>{
    err.status = err.status || 500;
    err.message = err.message || "Somthing went wrong";
    return res.status(err.status).json(err.message);
});


app.listen(8800 , async()=>{
    await connect();
    console.log("server connected at port 8800");
});