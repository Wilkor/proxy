 const axios = require('axios');
 const config = require('../config/index');

  validaDadosCliente =  (req, res) => {

const {idsProposta, cpf, telefone} = req.body;

const identification =  parseInt(cpf);

  const payload = {
        idsProposta: idsProposta,
        cpf:identification,
        telefone: telefone
  }

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': req.headers['authorization']
    }}

     axios.post(config.urlValidaDadosCliente, payload,headers).then((resp) => {

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