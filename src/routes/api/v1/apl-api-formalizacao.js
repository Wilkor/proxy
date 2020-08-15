const  express = require('express')
const routes = express.Router();


const AcompanhamentoFormalizacao = require('../../../ControllersConsig/ControllerAcompanamento');
const ControllersSchedules = require('../../../ControllersConsig/ControllersSchedules');
const ControllersValidaDadosCliente = require('../../../ControllersConsig/ControllersValidaDadosCliente');
const ControllersArtefatos = require('../../../ControllersConsig/ControllersArtefatos');
const ControllerCancelaFormalizacao = require('../../../ControllersConsig/ControllerCancelaFormalizacao');
const ControllerAssinarProposta = require('../../../ControllersConsig/ControllerAssinarProposta');
const ControllerReabrirFormalizacao = require('../../../ControllersConsig/ControllerReabrirFormalizacao');
const ControllerUriToBase64 = require('../../../ControllersConsig/ControllerUriToBase64');
const ControllerUpload = require('../../../ControllersConsig/ControllerUpload');
const ControllerUpdateResourceAndSendBroadCast = require('../../../ControllersConsig/ControllerUpdateResourceAndSendBroadCast');
const ControllerTalking = require('../../../ControllersConsig/ControllerTalking');
const ControllerToken = require('../../../ControllersConsig/ControllerToken');
const ControllerAccount = require('../../../ControllersConsig/ControllerAccount');
const ControllerThreads = require('../../../ControllersConsig/ControllerThreads');
const ControllerGetPdf = require('../../../ControllersConsig/ControllerGetPdf');
const ControllerRemoveFile = require('../../../ControllersConsig/ControllerRemoveFile');
const ControllerConversa = require('../../../ControllersConsig/ControllerConversa');
const ControllerLogFile = require('../../../ControllersConsig/ControllerLogFile');
const ControllerConsultaResource = require('../../../ControllersConsig/ControllerConsultaResource');


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
    routes.post('/AcompanhamentoFormalizacao', AcompanhamentoFormalizacao.acompanhamento);
    routes.post('/AssinarProposta', ControllerAssinarProposta.assinarProposta);
    routes.post('/CancelarFormalizacao', ControllerCancelaFormalizacao.cancelaFormalizacao );
    routes.post('/Artefatos',ControllersArtefatos.artefatoImage);
    routes.post('/ReabrirFormalizacao', ControllerReabrirFormalizacao.reabrirFormalizacao );
    routes.get('/removefile', ControllerRemoveFile.removeUploads);
    routes.get('/pdf', ControllerLogFile.logFilePdf);
    routes.get('/image', ControllerLogFile.logFileDownload);
    routes.get('/conversa', ControllerConversa.artefatosHistory);
    routes.get('/resource/:id', ControllerConsultaResource.getResource);
    routes.get('/resource/:id/:template', ControllerConsultaResource.updateResource);
    
    module.exports = routes;