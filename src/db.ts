import mongoose, {model,Schema} from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
    throw new Error("MONGO_URL environment variable is not defined");
}
mongoose.connect(mongoUrl);

const UserSchema = new Schema({
    username: {type : String , unique : true , required : true},
    password:{type : String}
})

export const UserModel = model( "User" , UserSchema);


const ContentSchema = new Schema({
    title : {type : String , required : true},
    link : {type : String},
    tags :[{type : mongoose.Types.ObjectId, ref : 'Tag'}],
    userId :[{type : mongoose.Types.ObjectId, ref : 'User' , required:true}],

})

export const ContentModel = model("Content" ,ContentSchema);