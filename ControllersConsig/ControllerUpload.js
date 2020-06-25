const axios = require('axios');
const  multer = require("multer");
const  fs = require("fs");
const  path = require("path");

const  storage = multer.diskStorage({
  destination: path.resolve(__dirname,'../upload'),
  filename: (request, file, callback) => {
    callback(null, file.originalname)
  }
});

const upload = multer({storage: storage}).array('file', 5);

uploads = async (req, res) => {
  let filesBase64 = [];
  upload(req, res, (err) => {
    if(err) {
      console.log('Error Occured');
      return;
    }
    
    filesBase64.push({
         fileName : req.files[0].originalname,
         base64 : new Buffer(fs.readFileSync(req.files[0].path)).toString('base64')
       });

     res.status(202).json({base64:filesBase64[0].base64});

  })
}
module.exports = {uploads}