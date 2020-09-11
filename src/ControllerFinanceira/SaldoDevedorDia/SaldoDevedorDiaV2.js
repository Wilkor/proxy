const axios = require('axios');
const config = require('../../config/index');

SaldoDevedorDiaV2 =  (req, res) => {

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': req.headers['authorization']
    }}
  
    axios.
    post(`${config.financeira.baseUrl}/api/v2/scd/SaldoDevedorDia`, req.body, headers)
    .then((resp) => {
    const jsonText = JSON.stringify(resp.data);
    const responseObject = JSON.parse(jsonText);
    res.json(responseObject);

  }).catch((err) => {
  
   res.status(err.response.status).json({error: err.response.data})
 });

}
module.exports = {
  SaldoDevedorDiaV2
}