const axios = require('axios');

assinarProposta =  async (req, res) => {

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': req.headers['authorization']
    }}
  const payload = req.body
  
  const url = 'https://api-h.safrafinanceira.com.br/apl-api-formalizacao-consignado/api/v1/AssinarProposta'

  const response2 = await axios.post(url, payload,headers);

  const jsonText3 = JSON.stringify(response2.data);
  const responseObject3 = JSON.parse(jsonText3);

   res.send(responseObject3)
}

module.exports = {assinarProposta}