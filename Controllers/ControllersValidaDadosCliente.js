
 const axios = require('axios');
 
  validaDadosCliente = async (req, res) => {

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': req.headers['authorization']
    }}
  const payload = req.body

      const url = 'https://api-h.safrafinanceira.com.br/apl-api-formalizacao-consignado/api/v1/ValidacaoDadosCliente';

     axios.post(url, payload,headers).then((resp) => {

         const jsonText3 = JSON.stringify(resp.data);
         const responseObject3 = JSON.parse(jsonText3);
         res.send(responseObject3);

     }).catch((err) => {
        res.status(400).send(err) 
     })
}

module.exports ={validaDadosCliente}