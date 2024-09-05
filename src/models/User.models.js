import mongoose,{ Schema } from "mongoose";
import bycrpt from "bycrpt"
import jwt from "jsonwebtoken"
const userSchema = new Schema({
    Username:{
        required : true,
        type :String,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,
    },
    email:{
        unique: true,
        trim:true,
        lowercase:true,
        type : String,
        required: true,
    },
    password:{
        type: String,
        required : true,

    },
    fullname:{
        lowercase: true,
        trim : true,
        type :String ,
        required : true,

    },
    avatar:{
        required : true,
        type: String
    },
    watchistory:[
        {
            type: Schema.Types.ObjectId,
            ref :"Video"
        }
    ],
    refreshToken:{
        type: String
    }



},{timestamps:true});

userSchema.pre("save", async function(next){

    if(!this.isModified("password")) return next()
    this.password = bycrpt.hash(this.password, 10)
    next()
})


userSchema.methods.isPasswordCorrect = async function
(password){
     await bycrpt.compare(password,this.password)
}


userSchema.methods.generateAccessToken =  function
(){
    return jwt.sign(
        {
            _id : this._id,
            username:this.Username,
            email: this.email,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }

    )
}

userSchema.methods.generateRefreshToken =  function
(){
    return jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }

    )
}


export const User = mongoose.model("User",userSchema)