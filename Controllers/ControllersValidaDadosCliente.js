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
       
        res.status(200).send(responseObject3);

    }).catch((err) => {
  
      res.status(400).json({error: err.response.statusText});
      
   });
  

}

module.exports = {
  validaDadosCliente
}