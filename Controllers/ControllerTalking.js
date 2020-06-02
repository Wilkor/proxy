const axios = require('axios');
 talking =  async (req,res) => {

  console.log(req.body.id);
  res.send('ok')
   
}

module.exports ={
  talking
}