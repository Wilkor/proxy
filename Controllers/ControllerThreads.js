const axios = require('axios');

threads =  (req, res) => {

  const {history} = req.body;
  res.status(200).json({message:'ok', response:history});
 
 }

module.exports = {
  threads
}