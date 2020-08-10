const axios = require('axios');
const config = require('../../config/index');

getBank = async (req, res) => {

  let tokenVpc = await axios.post(`${config.contratacao.vpc}/api/v1/Token`, req.body);
  
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + tokenVpc.data.token
    }}

    axios.get(`${config.contratacao.vpc}/api/v1/Bancos`, headers).then((resp) => {
      
    const jsonText = JSON.stringify(resp.data);
    const responseObject = JSON.parse(jsonText);
    res.json(responseObject);

  }).catch((err) => {
  
   res.status(err.response.status).json({error: err.response.data})
 });

}
module.exports = {
  getBank
}