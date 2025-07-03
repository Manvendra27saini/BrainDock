import express from "express";
import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import { UserModel ,ContentModel } from "./db";
import './db';
import { JWT_PASSWORD } from "./config";
import { userMiddleware } from "./middleware";

const app = express();
app.use(express.json());
const port = 3000;


app.post("/api/v1/signup", async (req, res) => {
  const username :String =req.body.username;
  const password :String =req.body.password;

  try{await UserModel.create({
    username:username,
    password:password
  })

  res.json({
    message:"User Signed Up Successfully"
  })
}catch(e){
    res.status(411).json({
       message:"User Already Exists"
    })
}

});

app.post("/api/v1/signin", async(req, res) => {
  
    const username :String =req.body.username;
    const password :String =req.body.password;

    const existingUser = await UserModel.findOne({
        username,
        password
    })
    if(existingUser){
        const token = jsonwebtoken.sign({
            id: existingUser._id
        }, JWT_PASSWORD);
        res.json({
            token
        })
    }else{
        res.status(403).json({
            message: "Invalid Username or Password"
        })
    }
});

app.post("/api/v1/content", userMiddleware, async(req, res) => {
    const title: string =req.body.title;
    const link: string = req.body.link;
    const type: string = req.body.type;

    await ContentModel.create({
        title,
        link,
        type,
         //@ts-ignore
        userId :req.userId,
        tags : []

    })
    res.json({
        message: "Content Added Successfully"
    })
    
});

app.get("/api/v1/content", userMiddleware, async(req, res) => {
    //@ts-ignore
    const userId=req.userId;
    const content= await ContentModel.find({
        userId:userId
    }).populate("userId" ,"username")
    res.json({
        content
    })


});

app.delete("/api/v1/content",userMiddleware,  async(req, res) => {
   const contentId=req.body.contentId;

   await ContentModel.deleteMany({
    contentId,
    //@ts-ignore
    userId:req.userId
   })

   res.json({
    message:"Content deleted Successfully"
   })
});

app.post("/api/v1/brain/share", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/v1/brain/:shareLink", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
