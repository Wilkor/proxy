const axios = require('axios');
const config = require('../config/index');

token =  (req, res) => {
  
    axios.post(config.formalizacao.urlToken, req.body).then((resp) => {
      
    const jsonText3 = JSON.stringify(resp.data);
    const responseObject3 = JSON.parse(jsonText3);
    res.json(responseObject3);

  }).catch((err) => {
  
   res.status(err.response.status).json({error: err.response.statusText})
 });

}
module.exports = {
  token
}