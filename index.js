const express = require("express");
const app = express();
const fileUpload = require('express-fileupload');
const webp=require('webp-converter');
 
// this will grant 755 permission to webp executables
webp.grant_permission()
 

app.use(express.json())
app.use(fileUpload());
 


 
app.post("/files",async (req,res)=>{
  // console.log(req.files)

 let sampleFile = req.files.test;
let uploadPath = __dirname + '/upload/original/' + "Image"+Date.now()+`.${sampleFile.name.split(".").pop()}`;




  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);
      let op=`./upload/webp/${uploadPath.split("/").pop().split(".")[0]}.webp`
      const result = webp.cwebp(`upload/original/${uploadPath.split("/").pop()}`,op,"-q 100",logging="-v");
      result.then((response) => {
        // console.log("test",{response});
        res.send(op)
      
      });
    res.json({message:'File uploaded!',fileName:uploadPath.split("/").pop()});
  });
})



let PORT = process.env.PORT || 5000
app.listen(PORT);
