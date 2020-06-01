const axios = require('axios');
const config = require('../config/index');
const uuid = require('../utils/index');

  scheduled = async (req,res) => {


  const {accesskey} = req.headers;
  const {contactIdentity} = req.body

  const headers = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': accesskey
      }}

  const payload = {  
          "id":uuid.uuid(),
          "to": "postmaster@scheduler.msging.net",
          "method": "get",
          "uri": "/schedules?$take=999999"
          }

      const response2 = await axios.post(`${config.baseUrl}/commands`, payload,headers);

      const data = response2.data.resource.items.filter((e) => {
          return e.status === 'scheduled'  
      }).filter((d) => {
      return d.message.to === contactIdentity
      });

      data.forEach(async (element) => {
        const payload2 = {  
              "id": uuid.uuid(),
              "to": "postmaster@scheduler.msging.net",
              "method": "delete",
              "uri": `/schedules/${element.message.id}`,
              }

        await axios.post(`${config.baseUrl}/commands`, payload2,headers);
          
      });
      const response3 = await axios.post(`${config.baseUrl}/commands`, payload,headers);

      const jsonText3 = JSON.stringify(response3.data);
      const responseObject3 = JSON.parse(jsonText3);
      
      res.send(responseObject3);
    },

   scheduledList = async (req,res) => {

  const {accesskey, identity} = req.headers;

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accesskey
    }}
    
  const payload = {  
      "id":uuid.uuid(),
      "to": "postmaster@scheduler.msging.net",
      "method": "get",
      "uri": "/schedules?$take=999999&$skip=800"
      }

  const response2 = await axios.post(`${config.baseUrl}/commands`, payload,headers);

      const data = response2.data.resource.items.filter((e) => {
           return e.status === 'scheduled'  
      }).filter((d) => {
       return d.message.to === identity
      });
      const jsonText3 = JSON.stringify(data);
      const responseObject3 = JSON.parse(jsonText3);

      res.send({tamanho: data.length});

}

module.exports = {scheduled,scheduledList}
