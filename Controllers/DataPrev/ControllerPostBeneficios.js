const axios = require('axios');
const config = require('../../config/index');

postBeneficios =  (req, res) => {

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': req.headers['authorization']
    }}

  
    console.log('headers ', headers)
    console.log('body ', req.body)


    axios.post(`${config.contratacao.baseUrl}/api/v1/DataprevBeneficios`, req.body, headers).then((resp) => {
      
    const jsonText = JSON.stringify(resp.data);
    const responseObject = JSON.parse(jsonText);
    res.json(responseObject);

  }).catch((err) => {

   res.status(err.response.status).json({error: err.response})
 });

}
module.exports = {
  postBeneficios
}