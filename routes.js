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
 console.log("logando", type)
 res.status(200).json({message:'ok', type:'type'});

});

routes.post('/threads', (req, res) => {

 const {history} = req.body;
 res.status(200).json({message:'ok', response:history});

});

routes.post('/account', async (req, res) => {

 const {acceskey} = req.headers;

const identify = uuidv4();

const headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': acceskey
      }}
 const payload = {  
                "id": "123",
                "method": "set",
                "uri": "/contacts",
                "type": "application/vnd.lime.contact+json",
                    "resource": {
                    "identity": "5511991279986@wa.gw.msging.net",
                    "name": "Rud",
                    "gender":"male",
                      "extras":{
                         "identity":"11991279986"
                      }
                }
                }
 const payload2 =   {
        "id": "1231",
        "method": "set",
        "uri":  "/resources/11991279986",
           "type": "application/json",
           "resource": {
            "LinkBiometria":" https://assinatura-digital.com.br",
            "broadcastOrigem":"safraprodconsigbiowa_boas_vindas_1",
            "propostas": [
            {
                "proposta": "123",
                "valor": "25,40",
                "status": "ativa",
                "Link_CET": "https://8080-bce20572-8690-48ba-8bf9-0cda8fb82fdd.ws-us02.gitpod.io/pdf/YmFuY29zYWZyYTEyMw==",
                "Link_CCB": "https://8080-bce20572-8690-48ba-8bf9-0cda8fb82fdd.ws-us02.gitpod.io/pdf/YmFuY29zYWZyYTEyMw==",
                "StatusProposta": "Ativo/Assinado/Ilegível/Cancelado/Pago",
                "Produto": "Refin"
            }]
     }

 }

   const response = await axios.post(`${baseUrl}/commands`, payload,headers);
   const jsonText = JSON.stringify (response.data);
   const responseObject = JSON.parse (jsonText);

    const response2 = await axios.post(`${baseUrl}/commands`, payload2,headers);
   const jsonText2 = JSON.stringify (response2.data);
   const responseObject2 = JSON.parse (jsonText2);
    
    res.status(200).json({responseObject,responseObject2});
    
})

routes.post('/Token', async (req, res) => {

  const resp = await axios.post('https://api-h.safrafinanceira.com.br/apl-api-formalizacao-consignado/api/v1/Token', req.body)

   const jsonText2 = JSON.stringify (resp.data);
   const responseObject2 = JSON.parse (jsonText2);

res.status(200).json(responseObject2);
})

routes.post('/base64', async (req, res) => {

 const {history} = req.body;
 const str = JSON.stringify(history);
 const enc = encode.encode(str,'base64')
res.status(200).json({base64:enc});
})

routes.post('/updatestatus', async (req, res) => {

 const {acceskey} = req.headers;
 const {status, id} = req.body;
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
                "Proposta": "10166599",
                "Valor": "120.40",
                "StatusProposta": status,
                "Produto": "REFIN",
                "LinkBiometria": "https://epfweb.safra.com.br/formalizacao/#/sf-formalizacao/login/b4056e86210220",
                "LinkCcb": "https://8080-bce20572-8690-48ba-8bf9-0cda8fb82fdd.ws-us02.gitpod.io/pdf/YmFuY29zYWZyYTEyMw==",
                "LinkCet": "https://8080-bce20572-8690-48ba-8bf9-0cda8fb82fdd.ws-us02.gitpod.io/pdf/YmFuY29zYWZyYTEyMw==",
                "Template": "safraprodconsigbiowa_boas_vindas_2"
               }

 }

    const response2 = await axios.post(`${baseUrl}/commands`, payload2,headers);
    const jsonText2 = JSON.stringify (response2.data);
    const responseObject2 = JSON.parse (jsonText2);
    
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
   
     console.log(req.body);
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
        "uri": "/schedules?$take=999999"
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

routes.post('/ValidacaoDadosCliente', async (req, res) => {


    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers['authorization']
      }}
    const payload = req.body


        const url = 'https://api-h.safrafinanceira.com.br/apl-api-formalizacao-consignado/api/v1/ValidacaoDadosCliente';


        console.log(url, payload,headers)

        const response2 = await axios.post(url, payload,headers);

        const jsonText3 = JSON.stringify(response2.data);
        const responseObject3 = JSON.parse(jsonText3);

     res.send(responseObject3)
  });

  routes.post('/AcompanhamentoFormalizacao', async (req, res) => {



    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers['authorization']
      }}
    const payload = req.body


        const url = 'https://api-h.safrafinanceira.com.br/apl-api-formalizacao-consignado/api/v1/AcompanhamentoFormalizacao'

        const response2 = await axios.post(url, payload,headers);

        const jsonText3 = JSON.stringify(response2.data);
        const responseObject3 = JSON.parse(jsonText3);

     res.send(responseObject3)
  });

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

   routes.post('/Artefatos', async (req, res) => {


    const headers = {
      headers: {
       'Content-Type': 'application/json',
        'Authorization': req.headers['authorization']
      }}
    const payload = req.body


        const url = 'https://api-h.safrafinanceira.com.br/apl-api-formalizacao-consignado/api/v1/Artefatos'

        const response2 =  await axios.post(url, payload,headers);

        const jsonText3 = JSON.stringify(response2.data);
        const responseObject3 = JSON.parse(jsonText3);

        res.send(responseObject3)
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


