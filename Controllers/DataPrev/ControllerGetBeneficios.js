const axios = require('axios');
const config = require('../../config/index');

getBeneficios =  (req, res) => {
  

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': req.headers['authorization']
    }}

    axios.get(`${config.contratacao.baseUrl}/api/v1/DataprevBeneficios/${req.params.cpf}`, headers).then((resp) => {
      
    const jsonText = JSON.stringify(resp.data);
    const responseObject = JSON.parse(jsonText);
    res.json(responseObject);

  }).catch((err) => {
  
   res.status(err.response.status).json({error: err.response.statusText})
 });

}
module.exports = {
  getBeneficios
}