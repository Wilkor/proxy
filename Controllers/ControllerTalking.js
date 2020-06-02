const axios = require('axios');
 talking =  async (req,res) => {

 const userInfo = req.body.id
 const multThree = userInfo.split('.net')[1];
 const userId = userInfo.split('.net')[0];


   console.log(multThree)
   res.send('ok')
 

}

module.exports ={
  talking
}