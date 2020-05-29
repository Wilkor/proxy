const  express = require('express')
const  fs = require("fs");
const  cors = require('cors');
const  app = express();
const axios = require('axios')
var http = require('http');
const  multer = require("multer");
const path = require('path');
const  baseUrl = 'https://msging.net';
const encode = require('nodejs-base64-encode');
const request = require('request');
const  moment = require('moment'); // require
const  pdf = require('html-pdf');


const AcompanhamentoFormalizacao = require('./Controllers/ControllerAcompanamento');

app.use(cors());
app.use(express.json());

const routes = express.Router();

      function uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      })
    }
    

routes.get('/', (req, res) => {

    res.status(200).json({message:'vivo'})

})

routes.get('/pdf/:id',  (req, res) => {

    const {id} = req.params;
    if (id === 'YmFuY29zYWZyYTEyMw==') {

        let file = fs.createReadStream('./public/Building Node Applications with MongoDB and Backbone.pdf');
            let stat = fs.statSync('./public/Building Node Applications with MongoDB and Backbone.pdf');
            res.setHeader('Content-Length', stat.size);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
            file.pipe(res); 
        } 
    });

routes.post('/logs', (req, res) => {
 const {type} = req.body;
 res.status(200).json({message:'ok', type:'type'});

});

routes.post('/threads', (req, res) => {

 const {history} = req.body;
 res.status(200).json({message:'ok', response:history});

});

routes.post('/account', async (req, res) => {

 const {accesskey} = req.headers;

 const identify = uuidv4();

 const headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accesskey
      }}
  const payload = {  
                "id": identify,
                "method": "set",
                "uri": "/contacts",
                "type": "application/vnd.lime.contact+json",
                    "resource": {
                    "identity": "5511991279986@wa.gw.msging.net",
                    "name": "Rud",
                    "gender":"male",
                      "extras":{
                         "identity":"11991279986_91566798825"
                      }
                }
                }
 

   const response = await axios.post(`${baseUrl}/commands`, payload,headers);
   const jsonText = JSON.stringify (response.data);
   const responseObject = JSON.parse (jsonText);


    
    res.status(200).json(responseObject);
    
})

routes.post('/Token', async (req, res) => {

  const resp = await axios.post('https://api-h.safrafinanceira.com.br/apl-api-formalizacao-consignado/api/v1/Token', req.body)

   const jsonText2 = JSON.stringify (resp.data);
   const responseObject2 = JSON.parse (jsonText2);

res.status(200).json(responseObject2);
})

routes.post('/base64', async (req, res) => {

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
  color: #353535;
}

.backgroundBlue {
  background: #2979FF;
}

.backgroundLight {
  background: #F3F3F3;
}</style>

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
            "id": uuidv4(),
            "method": "get",
            "uri": `/threads/${identity}?$take=100&storageDate=${moment().format('YYYY-MM-DD')}`
}
        
     const response2 = await axios.post(`${baseUrl}/commands`, payload,headers);

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
      
       table += `<body>`;
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

      table += `</body></html>`;

      pdf.create(table, options).toFile(`save_file_path/history-${idProposta}.pdf`, function(err, result) {
        if (err) return console.log(err);
        const base64History = fs.readFileSync(`./save_file_path/history-${idProposta}.pdf`).toString('base64')

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
             
        const url = 'https://api-h.safrafinanceira.com.br/apl-api-formalizacao-consignado/api/v1/Artefatos'

        axios.post(url, payload2,headers2).then((resp) => {

           const jsonText3 = JSON.stringify(resp.data);
           const responseObject3 = JSON.parse(jsonText3);

          //  const directory = './save_file_path';

          //   fs.readdir(directory, (err, files) => {
          //   if (err) throw err;

          //   for (const file of files) {
          //     fs.unlink(path.join(directory, file), err => {
          //       if (err) throw err;
          //     });
          //   }
          //   });

            //console.log(base64History)

           res.status(200).send(conversaBot)

       }).catch((err) => {
           
          res.status(400).send(err)

       });

      });
      

  
})

routes.post('/updatestatus', async (req, res) => {

 const {acceskey} = req.headers;
 const {status, id, localizable_params} = req.body;
 const identify = uuidv4();

const headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': acceskey
      }}

 const payload2 =   {
        "id": identify,
        "method": "set",
        "uri":  "/resources/" + id,
           "type": "application/json",
           "resource": {
                "Proposta": "10611953",
                "Valor": "120.40",
                "StatusProposta": 'teste',
                "Produto": "REFIN",
                "LinkBiometria": "https://epfweb.safra.com.br/formalizacao/#/sf-formalizacao/login/b4056e86210220",
                "LinkCcb": "https://8080-bce20572-8690-48ba-8bf9-0cda8fb82fdd.ws-us02.gitpod.io/pdf/YmFuY29zYWZyYTEyMw==",
                "LinkCet": "https://8080-bce20572-8690-48ba-8bf9-0cda8fb82fdd.ws-us02.gitpod.io/pdf/YmFuY29zYWZyYTEyMw==",
                "Template": status
               }

 }

 const payload3 = {
  "id": identify,
  "to": "5511970950034@wa.gw.msging.net",
  "type": "application/json",
  "content": {
    "type": "hsm",
    "hsm": {
      "namespace": "ad45c45f_5f5f_995f_636a_60da8e6532cc",
      "element_name": status,
      "language": {
                "policy": "deterministic",
                "code": "pt_BR"
      },
      localizable_params
    }
  }
}

    const response2 = await axios.post(`${baseUrl}/commands`, payload2,headers);
    const jsonText2 = JSON.stringify (response2.data);
    const responseObject2 = JSON.parse (jsonText2);


    const response3 = await axios.post(`${baseUrl}/messages`, payload3,headers);
    
    res.status(200).json(responseObject2);
    
})

var storage = multer.diskStorage({
  destination: path.resolve(__dirname,'upload'),
  filename: (request, file, callback) => {
    callback(null, file.originalname)
  }
});

var upload = multer({storage: storage}).array('file', 5);

routes.post('/upload', (req, res) => {
  var filesBase64 = [];
  upload(req, res, (err) => {
    if(err) {
      console.log('Error Occured');
      return;
    }
    
    filesBase64.push({
         fileName : req.files[0].originalname,
         base64 : new Buffer(fs.readFileSync(req.files[0].path)).toString('base64')
       });

     res.status(202).json({base64:filesBase64[0].base64});

  })
});

routes.post('/uritobase64', (req,res) => {

      const {uri,fileName} = req.body
      request(uri).pipe(fs.createWriteStream('./download/' + fileName)).on('close', () => {
      res.status(202).json({base64: new Buffer(fs.readFileSync('./download/'+ fileName)).toString('base64')})
    });

  });

  routes.post('/doc', (req,res) => {

      const {base64} = req.body
      res.status(200).json({msg:'recebido',base:base64})

  });
  routes.post('/talking', (req,res) => {
   
    
  });
  
  routes.post('/schedule', async (req,res) => {
    const {accesskey} = req.headers;
    const {contactIdentity} = req.body

        const headers = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accesskey
        }}
    const payload = {  
            "id":uuidv4(),
            "to": "postmaster@scheduler.msging.net",
            "method": "get",
            "uri": "/schedules?$take=999999"
            }
    

        const response2 = await axios.post(`${baseUrl}/commands`, payload,headers);

        const data = response2.data.resource.items.filter((e) => {
            return e.status === 'scheduled'  
        }).filter((d) => {
        return d.message.to === contactIdentity
        });



        data.forEach(async (element) => {
                const payload2 = {  
                            "id": uuidv4(),
                            "to": "postmaster@scheduler.msging.net",
                            "method": "delete",
                            "uri": `/schedules/${element.message.id}`,
                            }

            await axios.post(`${baseUrl}/commands`, payload2,headers);
            
        });
        const response3 = await axios.post(`${baseUrl}/commands`, payload,headers);

        const jsonText3 = JSON.stringify(response3.data);
        const responseObject3 = JSON.parse(jsonText3);
        
        res.send(responseObject3);
  });

  routes.post('/schedule/list', async (req,res) => {

    const {accesskey, identity} = req.headers;

    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accesskey
      }}
  const payload = {  
        "id":uuidv4(),
        "to": "postmaster@scheduler.msging.net",
        "method": "get",
        "uri": "/schedules?$take=999999&$skip=800"
        }

    const response2 = await axios.post(`${baseUrl}/commands`, payload,headers);

        const data = response2.data.resource.items.filter((e) => {
             return e.status === 'scheduled'  
        }).filter((d) => {
         return d.message.to === identity
        });
        const jsonText3 = JSON.stringify(data);
        const responseObject3 = JSON.parse(jsonText3);
        
        res.send(responseObject3);

  });

routes.post('/ValidacaoDadosCliente', (req, res) => {



    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers['authorization']
      }}
    const payload = req.body

        const url = 'https://api-h.safrafinanceira.com.br/apl-api-formalizacao-consignado/api/v1/ValidacaoDadosCliente';

       axios.post(url, payload,headers).then((resp) => {

           const jsonText3 = JSON.stringify(resp.data);
           const responseObject3 = JSON.parse(jsonText3);
           res.send(responseObject3);

       }).catch((err) => {
          res.status(400).send(err) 
       })

     

  });

  routes.post('/AcompanhamentoFormalizacao', AcompanhamentoFormalizacao);

    routes.post('/AssinarProposta', async (req, res) => {


    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers['authorization']
      }}
    const payload = req.body


        const url = 'https://api-h.safrafinanceira.com.br/apl-api-formalizacao-consignado/api/v1/AssinarProposta'

        const response2 = await axios.post(url, payload,headers);

        const jsonText3 = JSON.stringify(response2.data);
        const responseObject3 = JSON.parse(jsonText3);

     res.send(responseObject3)
  });

 routes.post('/CancelarFormalizacao',  async (req, res) => {

    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers['authorization']
      }}
    const payload = req.body

        const url = 'https://api-h.safrafinanceira.com.br/apl-api-formalizacao-consignado/api/v1/CancelarFormalizacao'

        const response2 = await axios.post(url, payload,headers);

        const jsonText3 = JSON.stringify(response2.data);
        const responseObject3 = JSON.parse(jsonText3);

     res.send(responseObject3)
  });

   routes.post('/Artefatos',  (req, res) => {

    const {uri, idProposta, idArtefato, idCanal, nomeArquivo} = req.body


    a.resource.items.map((e) => {
    
       if(e.direction == 'sent') {
         re
       }
    })

    request(uri).pipe(fs.createWriteStream('./download/' + nomeArquivo)).on('close',  () => {

   const headers = {
      headers: {
       'Content-Type': 'application/json',
        'Authorization': req.headers['authorization']
      }}

     const payload = {
                "idProposta": idProposta,
                "idArtefato": idArtefato,
                "idCanal": idCanal,
                "arquivo": new Buffer(fs.readFileSync('./download/'+ nomeArquivo)).toString('base64'),
               "nomeArquivo": nomeArquivo
             }
  

         
        const url = 'https://api-h.safrafinanceira.com.br/apl-api-formalizacao-consignado/api/v1/Artefatos'

        axios.post(url, payload,headers).then((resp) => {


           const jsonText3 = JSON.stringify(resp.data);
           const responseObject3 = JSON.parse(jsonText3);

           const directory = './download';

           fs.readdir(directory, (err, files) => {
           if (err) throw err;

           for (const file of files) {
             fs.unlink(path.join(directory, file), err => {
               if (err) throw err;
             });
           }
           });

    
          res.status(200).send(responseObject3)

       }).catch((err) => {
        res.status(400).send(err)
       });

    });


  });


  routes.post('ReabrirFormalizacao', async (req, res) => {

    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers['authorization']
      }}
    const payload = req.body

        const url = 'https://api-h.safrafinanceira.com.br/apl-api-formalizacao-consignado/api/v1/ReabrirFormalizacao'

        const response2 = await axios.post(url, payload,headers);

        const jsonText3 = JSON.stringify(response2.data);
        const responseObject3 = JSON.parse(jsonText3);

        res.send(responseObject3)
  });

module.exports = routes;


