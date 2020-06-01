const axios = require('axios');
const  fs = require("fs");
const request = require('request');
 
uriToBase64 = (req,res) => {
  const {uri,fileName} = req.body
  request(uri).pipe(fs.createWriteStream('./download/' + fileName)).on('close', () => {
  res.status(202).json({base64: new Buffer(fs.readFileSync('./download/'+ fileName)).toString('base64')})
});

}


module.exports = {uriToBase64}