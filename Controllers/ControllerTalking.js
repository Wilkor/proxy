const axios = require('axios');
const path = require('path');
 talking =  async (req,res) => {

//  const userInfo = req.body.id
//  const multThree = userInfo.split('.net')[1];
//  const userId = userInfo.split('.net')[0];


   console.log('opa', path.resolve('./download'))
   res.send('ok')
 

}

module.exports ={
  talking
}