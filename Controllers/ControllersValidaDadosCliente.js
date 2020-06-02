 const axios = require('axios');
 const config = require('../config/index');

  validaDadosCliente =  (req, res) => {

  const payload = req.body;

  console.log('payload', payload)
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': req.headers['authorization']
    }}

     axios.post(config.urlValidaDadosCliente, payload,headers).then((resp) => {

        const jsonText3 = JSON.stringify(resp.data);
        const responseObject3 = JSON.parse(jsonText3);
       
        res.status(resp.response.status).send(responseObject3);

    }).catch((err) => {
      if (err.response.status) {

        res.status(err.response.status).json({error: err.response.statusText});
      } else {
        res.status(400).json({error: err.response.statusText});
      }
   });
  

}

module.exports = {
  validaDadosCliente
}