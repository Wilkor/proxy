const axios = require('axios');
const config = require('../config/index');

reabrirFormalizacao =  (req, res) => {

  const payload = req.body;

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': req.headers['authorization']
    }}

      axios.post(config.urlReabirFormalizacao, payload,headers).then((resp) => {

        const jsonText3 = JSON.stringify(resp.data);
        const responseObject3 = JSON.parse(jsonText3);

       res.json(responseObject3)

      }).catch((err) => {
       res.status(err.response.status).json({error: err.response.statusText})
     });

    
}


module.exports = {reabrirFormalizacao}