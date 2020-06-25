const axios = require('axios');
const config = require('../../config/index');

blackList =  (req, res) => {
  
    axios.get(`${config.contratacao.baseUrl}/api/v1/Blacklist/telefone/${req.params.ddd}/${req.params.telefone}`).then((resp) => {
      
    const jsonText = JSON.stringify(resp.data);
    const responseObject = JSON.parse(jsonText);
    res.json(responseObject);

  }).catch((err) => {
  
   res.status(err.response.status).json({error: err.response.statusText})
 });

}
module.exports = {
  blackList
}