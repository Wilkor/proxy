const fs = require('fs');
const config = require('../config/index');
const path = require("path")

logFilePdf = (req, res) => {


  const dirPdf = config.pdf;
   fs.readdir(path.resolve(dirPdf),  (err, files,cb) => {
    res.send({pdf: files.length})
  });

  
}

logFileDownload = (req, res) => {

  const dirPdf = config.uploads;
   fs.readdir(path.resolve(dirPdf),  (err, files,cb) => {
    res.send({image: files.length})
  });

  
}

module.exports = {
  logFilePdf,
  logFileDownload
}