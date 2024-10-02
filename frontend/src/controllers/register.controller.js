const upload_preset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
const cloud_name = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

export const uploadToCloudinary = async (pics) => {
      
    if (pics) {
  
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", upload_preset);
      data.append("cloud_name", cloud_name);
      data.append("folder", "medify");

      const res = await 
      fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
        method: "post",
        body: data,
      })
        
        const fileData=await res.json();
        // console.log("url : ", fileData);
        return fileData.url
  
    } else {
      console.log("error");
    }
  };