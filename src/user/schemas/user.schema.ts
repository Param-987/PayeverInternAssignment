import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    id:{type:Number,unique:true,require:true},
    email:{type:String,require:true},
    first_name:{type:String},
    last_name:{type:String},
    avatar:{type:String,}
})