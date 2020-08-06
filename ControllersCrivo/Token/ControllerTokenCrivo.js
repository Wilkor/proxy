const axios = require('axios');
const config = require('../../config/index');

token =  (req, res) => {

  
    axios.post(`${config.crivo.baseUrl}/api/v1/Token`, req.body).then((resp) => {
      
    const jsonText = JSON.stringify(resp.data);
    const responseObject = JSON.parse(jsonText);
    res.json(responseObject);

  }).catch((err) => {

   res.status(err.response.status).json({error: err.response.data})
 });

}
module.exports = {
  token
}