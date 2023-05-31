import { Document } from "mongoose";

export interface ImageInterface extends Document {
    readonly id:Number,
    readonly hash:String,
    readonly data:String,
}