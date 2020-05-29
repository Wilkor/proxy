const axios = require('axios');
 
token = async (req, res) => {

  const resp = await axios.post('https://api-h.safrafinanceira.com.br/apl-api-formalizacao-consignado/api/v1/Token', req.body)

   const jsonText2 = JSON.stringify (resp.data);
   const responseObject2 = JSON.parse (jsonText2);

res.status(200).json(responseObject2);
}
module.exports = {
  token
}