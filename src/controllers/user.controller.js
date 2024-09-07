import { asyncHandler } from "../utils/asyncHandler.js";
import { apiErrors } from "../utils/apiErrors.js";
import { User } from "../models/User.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";
const registerUser = asyncHandler(async (req,res)=>{
    const{email,Username,fullname,password} = req.body;
    if(
        [email,Username,fullname,password].some((fields)=> fields?.trim() == "") 
    ){
        throw new apiErrors(401,"all the fields are mandatory")
    }

    const exisiting_User = await User.findOne({
        $or:[{ Username }, { email }]
    })

    if(exisiting_User){
        throw new apiErrors(402, "User already exists")
    }
   const avatarLocalPath = req.files?.avatar[0]?.path;
   if(!avatarLocalPath)
   {
    throw new apiErrors(403, "avatar is required")
   }
  const avatar =  await uploadOnCloudinary(avatarLocalPath);

  if (!avatar) {
    throw new apiErrors(404,"avatar is needed")
  }
  const user = await User.create({
    fullname,
    avatar:avatar.url,
    password,
    Username: Username.toLowerCase(),
    email
  })

  const created_user = await User.findById(user._id).select("-password -refreshToken");

  if(!created_user)
  {
    throw new apiErrors(500,"something went Wrong")
  }

return res.status(201).json(
    new apiResponse(200,created_user,"user registered successfully"))

})  

    


export { registerUser }