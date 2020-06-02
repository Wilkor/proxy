const axios = require('axios');
 talking =  async (req,res) => {

  console.log(req.body);
  res.send('ok')
   
}

module.exports ={
  talking
}