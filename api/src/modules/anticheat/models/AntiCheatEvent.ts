import mongoose from "mongoose";


const AntiCheatEventSchema =
new mongoose.Schema({

    type:{
        type:String,
        required:true
    },


    description:{
        type:String,
        required:true
    },


    severity:{
        type:Number,
        required:true
    },


    sessionId:{
        type:String,
        required:true
    },


    accountId:{
        type:String,
        required:false
    },

    
    createdAt:{
        type:Date,
        required:true
    }

});


export default mongoose.model(
    "AntiCheatEvent",
    AntiCheatEventSchema
);