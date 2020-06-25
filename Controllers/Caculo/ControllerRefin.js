const axios = require('axios');
const config = require('../../config/index');

calculoRefin =  (req, res) => {
  
    axios.post(`${config.contratacao.baseUrl}/api/v1/Calculo/Refin`, req.body).then((resp) => {
      
    const jsonText = JSON.stringify(resp.data);
    const responseObject = JSON.parse(jsonText);
    res.json(responseObject);

  }).catch((err) => {
  
   res.status(err.response.status).json({error: err.response.statusText})
 });

}
module.exports = {
  calculoRefin
}