const express = require('express');
const routes = express.Router();

const AntecipacaoParcelas = require('../../../ControllerFinanceira/AntecipacaoParcelas/AntecipacaoParcelas');
const AutenticacaoPositiva = require('../../../ControllerFinanceira/AutenticacaoPositiva/AutenticacaoPositiva');
const BloquearCliente = require('../../../ControllerFinanceira/BloquearCliente/BloquearCliente');
const BuscaDadosCpf = require('../../../ControllerFinanceira/BuscaDadosCpf/BuscaDadosCpf');
const DownloadBoleto = require('../../../ControllerFinanceira/Boletos/DownloadBoleto');
const Carnes = require('../../../ControllerFinanceira/Carnes/Carnes');
const CelularCliente = require('../../../ControllerFinanceira/CelularCliente/CelularCliente');
const ConsultaAni = require('../../../ControllerFinanceira/ConsultaAni/index');
const Contratos = require('../../../ControllerFinanceira/Contratos/index');
const EnvioSMS = require('../../../ControllerFinanceira/EnvioSMS/EnvioSms');
const Gravames = require('../../../ControllerFinanceira/Gravames/Gravames');
const IdentificaLojista = require('../../../ControllerFinanceira/IdentificaLojista/IdentificaLojista');
const LinhaDigitavel = require('../../../ControllerFinanceira/LinhaDigitavel/LinhaDigitavel');
const LinhaDigitavelValidar = require('../../../ControllerFinanceira/LinhaDigitavel/LinhaDigitavelValidar');
const LinhaDigitavelEmail = require('../../../ControllerFinanceira/LinhaDigitavel/LinhaPorEmail');
const ReembolsoCobranca = require('../../../ControllerFinanceira/ReembolsoCobranca/ReembolsoCobranca');
const SaldoDevedorDia = require('../../../ControllerFinanceira/SaldoDevedorDia/SaldoDevedorDia');
const SaldoDevedorDiaV2 = require('../../../ControllerFinanceira/SaldoDevedorDia/SaldoDevedorDiaV2');
const Correspondente = require('../../../ControllerFinanceira/Correspondente/Correspondente');
const ProcessarAceite = require('../../../ControllerFinanceira/AbusoPatrimonial/ProcessarAceite');

const StatusContrato = require('../../../ControllerFinanceira/StatusContrato/StatusContrato');
const StatusProposta = require('../../../ControllerFinanceira/StatusProposta/StatusProposta');
const Token = require('../../../ControllerFinanceira/Token/Token');


routes
.post('/api/v1/scd/AntecipacaoParcelas', 
AntecipacaoParcelas.AntecipacaoParcelas);
routes
.get('/api/v1/scd/AutenticacaoPositiva/:idContrato', 
AutenticacaoPositiva.AutenticacaoPositiva);
routes
.post('/api/v1/scd/BloquearCliente', BloquearCliente.BloquearCliente);
routes
.post('/api/v1/scd/AutenticacaoPositiva', AutenticacaoPositiva.AutenticacaoPositiva);
routes
.get('/api/v1/epf/BuscaDadosCpf/:idCliente', BuscaDadosCpf.BuscaDadosCpf);
routes
.get('/api/v1/scd/Carnes/:idContrato', Carnes.Carnes);
routes
.get('/api/v1/scd/CelularCliente/:idContrato', CelularCliente.CelularCliente);


routes
.get('/api/v1/epf/Correspondente/:idContrato', Correspondente.correspondente);

routes.get('/api/v1/epf/Boletos/:idContrato/Quitacao/:idCliente/Download', DownloadBoleto.DownloadBoleto)

 routes
 .get('/api/v1/scd/ConsultaAni/:numTelefone', 
 ConsultaAni.ScdConsultaAni.ScdConsultaAni);
 routes
 .get('/api/v1/epf/ConsultaAni/:numTelefone', 
 ConsultaAni.EpfConsultaAni.EpfConsultaAni);
 routes
 .get('/api/v1/scd/Contratos/:cpfCnpj', 
 Contratos.ScdContratosDocumento.ScdContratosDocumento);
 routes
 .get('/api/v1/scd/Contratos/GetContratos/:cpfCnpj', 
 Contratos.ScdContratosDocumentoCompleto.ScdContratosDocumentoCompleto);
 routes
 .get('/api/v1/scd/Contratos/:cpfCnpj/:idContrato', 
 Contratos.ScdContratosDocumentoEidContrato.ScdContratosDocumentoEidContrato);
 routes
 .get('/api/v1/epf/Contratos/:idCliente', 
 Contratos.EpfContratosIdCliente.EpfContratosIdCliente);
 routes
 .get('/api/v1/epf/Contratos/:idCliente/:idContrato', 
 Contratos.EpfContratoIdClienteIdContrato.EpfContratoIdClienteIdContrato);
 routes
 .post('/api/v1/scd/EnvioSMS', EnvioSMS.EnvioSMS);
 routes
 .get('/api/v1/scd/Gravames/:idContrato', Gravames.Gravames);
 routes
 .get('/api/v1/scd/IdentificaLojista/:cpfCnpj', IdentificaLojista.IdentificaLojista);
 routes
 .post('/api/v1/scd/LinhaDigitavel', LinhaDigitavel.LinhaDigitavel);
 routes
 .get('/api/v1/scd/LinhaDigitavel/LinhaDigitavel/:linhaDigitavel/LinhaDigitavelValidar', LinhaDigitavelValidar.LinhaDigitavelValidar);
 routes
 .post('/api/v1/scd/LinhaDigitavel/Email', LinhaDigitavelEmail.LinhaDigitavelEmail);
 routes
 .get('/api/v1/epf/ReembolsoCobranca/:idContrato', ReembolsoCobranca.ReembolsoCobranca);
 routes
 .post('/api/v1/scd/SaldoDevedorDia', SaldoDevedorDia.SaldoDevedorDia);
 routes
 .post('/api/v2/scd/SaldoDevedorDia', SaldoDevedorDiaV2.SaldoDevedorDiaV2);
 routes
 .get('/api/v1/epf/StatusContrato/:idCliente', StatusContrato.StatusContrato);
 routes
 .get('/api/v1/epf/StatusProposta/:idCliente', StatusProposta.StatusProposta);
 routes
 .post('/api/v1/Token', Token.Token);
 routes
 .post('/api/aqx/v1/AbusoPatrimonial/ProcessarAceite', ProcessarAceite.ProcessarAceite);

 module.exports = routes;
  

