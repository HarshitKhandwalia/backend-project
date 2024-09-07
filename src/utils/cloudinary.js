import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret:  process.env.API_SECRET,
});



const uploadOnCloudinary = async function(localfilepath) {
    try {
            if(!ocalfilepath) return null
           const response = await cloudinary.uploader.upload(localfilepath,{
                resource_type: "auto"
            })
            console.log("FILE HAS BEEN UPLOADED SUCESSFULLY", response.url);
            return response ;

    } catch (error) {
        fs.unlinkSync(localfilepath)
        return null
    }
}

export { uploadOnCloudinary }