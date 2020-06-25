const axios = require('axios');
const config = require('../../config/index');

getContratosRefin =  (req, res) => {

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': req.headers['authorization']
    }}


  
    axios.get(`${config.contratacao.baseUrl}/api/v1/Contratos/${req.params.cpf}/${req.params.idConvenio}/Refin`, headers).then((resp) => {
      
    const jsonText = JSON.stringify(resp.data);
    const responseObject = JSON.parse(jsonText);
    res.json(responseObject);

  }).catch((err) => {
  
   res.status(err.response.status).json({error: err.response.statusText})
 });

}
module.exports = {
  getContratosRefin
}