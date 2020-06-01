const axios = require('axios');
const config = require('../config/index');
const uuid = require('../utils/index');

account =  async (req, res) => {

  const {accesskey} = req.headers;
  const {name, hash} = req.body;


  const headers = {
       headers: {
         'Content-Type': 'application/json',
         'Authorization': accesskey
       }}

   const payload = {  
                 "id": uuid.uuid(),
                 "method": "set",
                 "uri": "/contacts",
                 "type": "application/vnd.lime.contact+json",
                     "resource": {
                      identity,
                      name,
                       "extras":{
                          "identity":hash
                       }
                 }
          }
  
    const response = await axios.post(`${config.baseUrl}/commands`, payload,headers);
    const jsonText = JSON.stringify (response.data);
    const responseObject = JSON.parse (jsonText);
    res.status(200).json(responseObject);
     
 }
module.exports = {
  account
}