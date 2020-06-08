
const axios = require('axios');
const request = require('request');
const  pdf = require('html-pdf');
const  moment = require('moment'); 
const  fs = require("fs");
const path = require("path")

const uuid = require('../utils/index');
const config = require('../config/index');


artefatoImage = async (req, res) => {

  try {
    fs.mkdirSync(path.join(__dirname, '../download/'))
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }

  try {
    fs.mkdirSync(path.join(__dirname, '../pdf/'))
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }


  console.log('payload', req.body);

  const {uri, idProposta, idArtefato, idCanal, nomeArquivo} = req.body;

  request(uri).pipe(fs.createWriteStream(path.resolve('./download/'+ nomeArquivo))).on('close',  () => {
    
 const headers = {
    headers: {
     'Content-Type': 'application/json',
      'Authorization': req.headers['authorization']
    }}

   const payload = {
              "idProposta": idProposta,
              "idArtefato": idArtefato,
              "idCanal": idCanal,
              "arquivo": new Buffer(fs.readFileSync(path.resolve('./download/'+ nomeArquivo))).toString('base64'),
              "nomeArquivo": nomeArquivo
   }
      axios.post(config.urlArtefato, payload,headers).then((resp) => {

        const jsonText3 = JSON.stringify(resp.data);
        const responseObject3 = JSON.parse(jsonText3);
       res.send(responseObject3)
      }).catch((err) => {
       res.status(err.response.status).json({error: err.response.statusText})
     });

   

  });


},

artefatosHistory = async (req, res) => {

  let table='';
  
  table += `<html> <style>

  .messages {
    padding: 5% 0;
    overflow: auto;
    flex: auto;
  }
  
  .messageBox {
    background: #F3F3F3;
    border-radius: 15px;
    padding: 1px 20px;
    color: white;
    display: inline-block;
    max-width: 80%;
  }
  
  .messageText {
    width: 100%;
    letter-spacing: 0;
    float: left;
    font-size: 0.9em;
    word-wrap: break-word;
  }
  
  .messageText img {
    vertical-align: middle;
  }
  
  .messageContainer {
    display: flex;
    margin-left: 250px;
    padding: 0 1%;
    margin-top: 3px;
  }
  
  .sentText {
    display: flex;
    align-items: center;
    font-family: Helvetica;
    color: #828282;
    letter-spacing: 0.3px;
    
  
  }
  
  .pl-10 {
    padding-left: 10px;
    width: 40em; word-wrap: break-word;
   
  }
  .pl-11 {
    padding-left: 10px;
  
    
  }
  
  .pr-10 {
    padding-right: 10px;
  
  }
  
  .justifyStart {
    justify-content: flex-start;
  }
  
  .justifyEnd {
    margin-left: 900px;
  }
  
  .colorWhite {
    color: white;
  }
  
  .colorDark {
    color: #738192;
  }
  
  .backgroundBlue {
    background: #0cc8cc;
  }
  
  .backgroundLight {
    background: #ebeef2;
  }
  .thread-header {
    width:100%;
    height:60px;
    background-color: #363f4e;
    border-radius: 5px;
    margin-bottom: 30px;

}
.text-history {

     font-family: Helvetica;
     color: #ffffff;
     margin-left:680px;
     margin-top:100px;
     font-size: 1.7em;
}
</style>
  `;
  
  
  var options = {
    "format": "A4",
    "orientation": "landscape",
    "border": {
      "top": "0.1in",
  },
  "timeout": "120000"
  };
  
      const {accesskey, identity} = req.headers;
      const {idProposta, idArtefato, idCanal, nomeArquivo} = req.body;
  
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accesskey
        }}
    const payload = {  
              "id": uuid.uuid(),
              "method": "get",
              "uri": `/threads/${identity}?$take=100&storageDate=${moment().format('YYYY-MM-DD')}`
  }
          
       const response2 = await axios.post(`${config.baseUrl}/commands`, payload,headers);
  
       const conversaBot =  response2.data.resource.items.map((e) => 
         {
         return {...e, autor: e.direction === 'sent'?'bot':'usuário'}
  
        }).map((e) => {
            return {
              autor:e.autor,
              content: typeof e.content == 'object' ? JSON.stringify(e.content): e.content,
              data: e.date.split('T')[0].split('-').reverse().join('/'),
              hora: e.date.split('T')[1].split('.')[0]
            }
          }).filter(e => e != null).reverse()
        
         table += `<body>
         
          <div class="thread-header" translate=""><br><span class="text-history"> Histórico de Conversa</span></div>
          <div background:#f9fbfb>`;

        conversaBot.filter((e) => {
  
          if(e.autor === 'bot'){
  
            table += `
            <div class="messageContainer justifyStart">
            <div class="messageBox backgroundLight">
              <p class="sentText pl-10  colorDark">${e.content}</p>
            </div>
            <p class="sentText pl-10 ">ChatBot - ${e.data} - ${e.hora}</p>
            </div>
  
            `
          }else{
  
            table += `
            <div class="messageContainer justifyEnd">
            <div class="messageBox backgroundBlue">
              <p class="sentText pl-11  colorWhite">${e.content}</p>
            </div>
            <p class="sentText pl-11 ">Cliente - ${e.data} - ${e.hora}</p>
            </div>
            ` 
          }
        })
  
        table += `</div></body></html>`;
  
        pdf.create(table, options).toFile(path.resolve('./pdf/'+`history-${idProposta}.pdf`), function(err, result) {
          if (err) return console.log(err);
          const base64History = new Buffer(fs.readFileSync(path.resolve(`./pdf/history-${idProposta}.pdf`))).toString('base64')

      const headers2 = {
        headers: {
         'Content-Type': 'application/json',
          'Authorization': req.headers['authorization']
        }}
         
       const payload2 = {
                  "idProposta": idProposta,
                  "idArtefato": idArtefato,
                  "idCanal": idCanal,
                  "arquivo": base64History,
                  "nomeArquivo": `history-${idProposta}`
               }
          
          axios.post(config.urlArtefato, payload2,headers2).then((resp) => {

            const jsonText3 = JSON.stringify(resp.data);
            const responseObject3 = JSON.parse(jsonText3);
    
           res.json(base64History)
 
           }).catch((err) => {
           res.status(err.response.status).json({error: err.response.statusText})
          });
 
  
        });
          
  }



module.exports = {artefatoImage, artefatosHistory}