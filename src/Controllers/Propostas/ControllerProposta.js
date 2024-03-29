const axios = require('axios');
const config = require('../../config/index');

getProposta =  (req, res) => {
  

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': req.headers['authorization']
    }}


    axios.get(`${config.contratacao.baseUrl}/api/v1/Propostas/${req.params.id}`, headers).then((resp) => {
      
    const jsonText = JSON.stringify(resp.data);
    const responseObject = JSON.parse(jsonText);
    res.json(responseObject);

  }).catch((err) => {
   console.log(err)
   //res.status(err.response.status).json({error: err.response.data})
 });

}
module.exports = {
  getProposta
}