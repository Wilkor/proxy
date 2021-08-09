const axios = require('axios');
const config = require('../../config/index');

ProcessarAceite =  (req, res) => {

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': req.headers['authorization']
    }}
  
    axios.
    post(`${config.financeira.baseUrl}/api/aqx/v1/AbusoPatrimonial/ProcessarAceite`, req.body, headers)
    .then((resp) => {
    const jsonText = JSON.stringify(resp.data);
    const responseObject = JSON.parse(jsonText);
    res.json(responseObject);

  }).catch((err) => {
  
   res.status(err.response.status).json({error: err.response.data})
 });

}
module.exports = {
  ProcessarAceite
}