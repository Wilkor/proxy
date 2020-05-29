const  fs = require("fs");
const config = require('../config/index');
const  path = require("path");


removeUploads = async (req,res) => {

  const directoryPdf = config.pdf;

  fs.readdir(directoryPdf, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    fs.unlink(path.join(directoryPdf, file), err => {
      if (err) throw err;
    });
  }
  });


  const directoryUpload = config.uploads;

  fs.readdir(directoryUpload, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    fs.unlink(path.join(directoryUpload, file), err => {
      if (err) throw err;
    });
  }
  });


  res.send({message:'deleted'})


}


module.exports = {
  removeUploads
}