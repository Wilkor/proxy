const axios = require('axios');
const config = require('../../config/index');
const random = require('../../utils/index')

scheduled = async (req,res) => {


  const {accesskey} = req.headers;
  //const {contactIdentity} = req.body

  const headers = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': accesskey
      }}

  const payload = {  
          "id":random.uuid(),
          "to": "postmaster@scheduler.msging.net",
          "method": "get",
          "uri": "/schedules?$take=999999"
          }

      const response2 = await axios.post(`${config.formalizacao.baseUrl}/commands`, payload,headers);

      const data = response2.data.resource.items.filter((e) => {
          return e.status === 'scheduled'  
      })
      //.filter((d) => {
     // return d.message.to === contactIdentity
      //});

      data.forEach(async (element) => {
        const payload2 = {  
              "id": random.uuid(),
              "to": "postmaster@scheduler.msging.net",
              "method": "delete",
              "uri": `/schedules/${element.message.id}`,
              }

        await axios.post(`${config.formalizacao.baseUrl}/commands`, payload2,headers);
          
      });
      
      axios.post(`${config.formalizacao.baseUrl}/commands`, payload,headers).then((resp) => {

        const jsonText3 = JSON.stringify(resp.data);
        const responseObject3 = JSON.parse(jsonText3);
          
       res.status(200).json(responseObject3);

      }).catch((err) => {
       res.status(err.response.status).json({error: err.response.statusText})
     });
    
    }
    module.exports = {
      scheduled
    }