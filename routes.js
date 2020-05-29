const  express = require('express')
const  cors = require('cors');
const  app = express();

app.use(cors());
app.use(express.json());

const AcompanhamentoFormalizacao = require('./Controllers/ControllerAcompanamento');
const ControllersSchedules = require('./Controllers/ControllersSchedules');
const ControllersValidaDadosCliente = require('./Controllers/ControllersValidaDadosCliente');
const ControllersArtefatos = require('./Controllers/ControllersArtefatos');
const ControllerCancelaFormalizacao = require('./Controllers/ControllerCancelaFormalizacao');
const ControllerAssinarProposta = require('./Controllers/ControllerAssinarProposta');
const ControllerReabrirFormalizacao = require('./Controllers/ControllerReabrirFormalizacao');
const ControllerUriToBase64 = require('./Controllers/ControllerUriToBase64');
const ControllerUpload = require('./Controllers/ControllerUpload');
const ControllerUpdateResourceAndSendBroadCast = require('./Controllers/ControllerUpdateResourceAndSendBroadCast');
const ControllerTalking = require('./Controllers/ControllerTalking');
const ControllerToken = require('./Controllers/ControllerToken');
const ControllerAccount = require('./Controllers/ControllerAccount');
const ControllerThreads = require('./Controllers/ControllerThreads');
const ControllerGetPdf = require('./Controllers/ControllerGetPdf');


const routes = express.Router();


    routes.get('/', (req, res) => {

        res.status(200).json({message:'vivo'})

    })

    routes.get('/pdf/:id', ControllerGetPdf.getPdf);  
    routes.post('/threads', ControllerThreads.threads);
    routes.post('/account', ControllerAccount.account);
    routes.post('/Token', ControllerToken.token);
    routes.post('/base64',ControllersArtefatos.artefatosHistory);
    routes.post('/updatestatus', ControllerUpdateResourceAndSendBroadCast.updateResourceAndSendBroadCast );
    routes.post('/upload', ControllerUpload.uploads);
    routes.post('/uritobase64', ControllerUriToBase64.uriToBase64 );
    routes.post('/talking',ControllerTalking.talking);
    routes.post('/schedule', ControllersSchedules.scheduled);
    routes.post('/schedule/list', ControllersSchedules.scheduledList);
    routes.post('/ValidacaoDadosCliente', ControllersValidaDadosCliente.validaDadosCliente);
    routes.post('/AcompanhamentoFormalizacao', AcompanhamentoFormalizacao);
    routes.post('/AssinarProposta', ControllerAssinarProposta.assinarProposta);
    routes.post('/CancelarFormalizacao', ControllerCancelaFormalizacao.cancelaFormalizacao );
    routes.post('/Artefatos',ControllersArtefatos.artefatoImage);
    routes.post('ReabrirFormalizacao', ControllerReabrirFormalizacao.reabrirFormalizacao );

module.exports = routes;


