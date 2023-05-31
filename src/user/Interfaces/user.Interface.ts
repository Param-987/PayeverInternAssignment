import { Document } from "mongoose";

export interface IUser extends Document {
    readonly id:Number,
    readonly email:String,
    readonly first_name:String,
    readonly last_name:String,
    readonly avatar:String,
}