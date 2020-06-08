const axios = require('axios');
const config = require('../config/index');

acompanhamento =  (req, res) => {

    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers['authorization']
      }}


    const payload = req.body;
          
          axios.post(config.urlAcompanhamento, payload,headers).then((resp) => {
  
             const jsonText3 = JSON.stringify(resp.data);
             const responseObject3 = JSON.parse(jsonText3);
             res.json(responseObject3);
             
           }).catch((err) => {
            res.status(err.response.status).json({error: err.response.statusText})
          });
   
       
      }
  
module.exports = {acompanhamento}