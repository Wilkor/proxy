const axios = require('axios');
const config = require('../config/index');

acompanhamento =  (req, res) => {

    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers['authorization']
      }}

    const payload = req.body;

        console.log(payload);

        axios.post(config.urlAcompanhamento, payload,headers).then((resp) => {

           const jsonText3 = JSON.stringify(resp.data);
           const responseObject3 = JSON.parse(jsonText3);
           res.send(responseObject3);
           
         }).catch((err) => {
          console.log('payload', payload);
          console.log('error', err.response.statusText);
          res.status(err.response.status).json({error: err.response.statusText})
        });

      }
  
module.exports = {acompanhamento}