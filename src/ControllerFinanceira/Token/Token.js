const axios = require('axios');
const config = require('../../config/index');

Token =  (req, res) => {

  const headers = {
    headers: {
      'Content-Type': 'application/json'
    }}
  
    axios.
    post(`${config.financeira.baseUrl}/api/v1/Token`, req.body, headers)
    .then((resp) => {
    const jsonText = JSON.stringify(resp.data);
    const responseObject = JSON.parse(jsonText);
    res.json(responseObject);

  }).catch((err) => {
  
   res.status(err.response.status).json({error: err.response.data})
 });

}
module.exports = {
  Token
}