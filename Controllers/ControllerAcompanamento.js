const axios = require('axios');
const config = require('../config/index');

acompanhamento =  (req, res) => {

   console.log('acompanhamento', req);

    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers['authorization']
      }}


    const payload = req.body;

      try {
        
        axios.post(config.urlAcompanhamento, payload,headers).then((resp) => {
  
           const jsonText3 = JSON.stringify(resp.data);
           const responseObject3 = JSON.parse(jsonText3);
           res.json(responseObject3);
           
         }).catch((err) => {
  
          console.log(' then - catch', err.response.statusText);
          
          res.status(err.response.status).json({error: err.response.statusText})
        });

      } catch (error) {

        console.log('catch', error)
        
      }

   
   
      }
  
module.exports = {acompanhamento}