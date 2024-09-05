import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema =  new Schema({
    videoFile:{
        required: true,
        type:String
    },
    Thumbnail:{
        required: true,
        type:String
    },
    Title:{
        required: true,
        type:String
    },
    Description:{
        required: true,
        type:String
    },
    Duration:{
        required: true,
        type :Number,
    },
    owner:[
        {
            type: Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    views:{
        type: Number,
        required: true,
    }
    
},{timestamps:true})


videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video", videoSchema)