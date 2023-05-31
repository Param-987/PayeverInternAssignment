import * as mongoose from "mongoose";

export const ImageSchema = new mongoose.Schema({
    id:{type:Number,unique:true,require:true},
    hash:{type:String,require:true},
    data:{type:String,}
})