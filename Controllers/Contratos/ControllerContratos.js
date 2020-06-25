const axios = require('axios');
const config = require('../../config/index');

getContratos =  (req, res) => {
  
    axios.get(`${config.contratacao.baseUrl}/api/v1/Contratos/${req.params.cpf}`).then((resp) => {
      
    const jsonText = JSON.stringify(resp.data);
    const responseObject = JSON.parse(jsonText);
    res.json(responseObject);

  }).catch((err) => {
  
   res.status(err.response.status).json({error: err.response.statusText})
 });

}
module.exports = {
  getContratos
}

