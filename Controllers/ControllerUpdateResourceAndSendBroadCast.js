  const axios = require('axios');
  const config = require('../config/index');
  const uuid = require('../utils/index');

  
  updateResourceAndSendBroadCast = async (req, res) => {
  const {acceskey} = req.headers;
  const {status, id, localizable_params, to} = req.body;
  const identify = uuid.uuid();
 
 const headers = {
       headers: {
         'Content-Type': 'application/json',
         'Authorization': acceskey
       }}
 
  const payload2 =   {
         "id": identify,
         "method": "set",
         "uri":  "/resources/" + id,
            "type": "application/json",
            "resource": {
                 "Proposta": "10612034",
                 "Valor": "120.40",
                 "StatusProposta": 'teste',
                 "Produto": "REFIN",
                 "LinkBiometria": "https://epfweb.safra.com.br/formalizacao/#/sf-formalizacao/login/b4056e86210220",
                 "LinkCcb": "https://8080-bce20572-8690-48ba-8bf9-0cda8fb82fdd.ws-us02.gitpod.io/pdf/YmFuY29zYWZyYTEyMw==",
                 "LinkCet": "https://8080-bce20572-8690-48ba-8bf9-0cda8fb82fdd.ws-us02.gitpod.io/pdf/YmFuY29zYWZyYTEyMw==",
                 "Template": status
                }
 
  }
 
  const payload3 = {
   "id": identify,
    to,
   "type": "application/json",
   "content": {
     "type": "hsm",
     "hsm": {
       "namespace": "ad45c45f_5f5f_995f_636a_60da8e6532cc",
       "element_name": status,
       "language": {
                 "policy": "deterministic",
                 "code": "pt_BR"
       },
       localizable_params
     }
   }
 }
 
     const response2 = await axios.post(`${config.baseUrl}/commands`, payload2,headers);
     const jsonText2 = JSON.stringify (response2.data);
     const responseObject2 = JSON.parse (jsonText2);
     const response3 = await axios.post(`${config.baseUrl}/messages`, payload3,headers);
     
     res.status(200).json(responseObject2);
     
 }

module.exports ={
  updateResourceAndSendBroadCast
}