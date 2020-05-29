const axios = require('axios');
const config = require('../config/index');
const uuid = require('../utils/index');

account =  async (req, res) => {

  const {accesskey} = req.headers;
 
  const identify = uuid.uuid();
 
  const headers = {
       headers: {
         'Content-Type': 'application/json',
         'Authorization': accesskey
       }}
   const payload = {  
                 "id": identify,
                 "method": "set",
                 "uri": "/contacts",
                 "type": "application/vnd.lime.contact+json",
                     "resource": {
                     "identity": "5511991279986@wa.gw.msging.net",
                     "name": "Rud",
                     "gender":"male",
                       "extras":{
                          "identity":"11991279986_91566798825"
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