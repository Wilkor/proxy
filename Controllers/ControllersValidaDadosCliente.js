 const axios = require('axios');
 const config = require('../config/index');
 const uuid = require('../utils/index');
  validaDadosCliente =  async (req, res) => {

const {idsProposta, cpf, telefone} = req.body;


const headersBlip = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Key c2FmcmFwcm9kY29uc2lnYmlvd2E6T1Z1WU1zQlN6YjgyRTJIblJOYkE='
  }}


  const payload = {
        idsProposta: idsProposta,
        cpf:cpf.replace(/\D/g, ''),
        telefone: telefone
  }

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': req.headers['authorization']
    }}

    const payload2 = { 

      "id": uuid.uuid(),
      "method": "get",
      "uri": `/resources/${telefone}_${cpf}`
     }
     

     axios.post(config.urlValidaDadosCliente, payload,headers).then( async (resp) => {


       if (resp.data[0].flCpfValidado === true) {

         const response = await axios.post(`${config.baseUrl}/commands`, payload2,headersBlip);
               response.data.resource['Template'] = 'consultaCPF';
  
         const payload3 = {
  
           "id": uuid.uuid(),
           "method": "set",
           "uri":  `/resources/${telefone}_${cpf}`,
              "type": "application/json",
              "resource": response.data.resource
       
         }
  
         await axios.post(`${config.baseUrl}/commands`, payload3,headersBlip);
       } 


        const jsonText3 = JSON.stringify(resp.data);
        const responseObject3 = JSON.parse(jsonText3);

        res.status(200).json(responseObject3);

    }).catch((err) => {
  
      res.status(400).json({error: err.response.statusText});
      
   });
  

}

module.exports = {
  validaDadosCliente
}