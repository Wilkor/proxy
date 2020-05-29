const fs = require('fs');
const config = require('../config/index');


logFilePdf = (req, res) => {


  const dirPdf = config.pdf;
   fs.readdir(dirPdf,  (err, files,cb) => {
    res.send({pdf: files.length})
  });

  
}

logFileDownload = (req, res) => {

  const dirPdf = config.uploads;
   fs.readdir(dirPdf,  (err, files,cb) => {
    res.send({image: files.length})
  });

  
}

module.exports = {
  logFilePdf,
  logFileDownload
}