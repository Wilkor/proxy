const express = require('express');
const routes = express.Router();


const ControllerToken = require('../../../Controllers/Token/ControllerToken');
const ControllerVinculoEmpregaticio = require('../../../Controllers/VinculoEmpregaticio/ControllerVinculoEmpregaticio');
const ControllerBlackList = require('../../../Controllers/BlackList/ControllerTelefone');

const ControllerNovo = require('../../../Controllers/Propostas/ControllerNovo');
const ControllerRefin = require('../../../Controllers/Propostas/ControllerRefin');
const ControllerProposta = require('../../../Controllers/Propostas/ControllerProposta');

const ControllerGetBeneficios = require('../../../Controllers/DataPrev/ControllerGetBeneficios');
const ControllerPostBeneficios = require('../../../Controllers/DataPrev/ControllerPostBeneficios');

const ControllerContratos = require('../../../Controllers/Contratos/ControllerContratos');
const ControllerContratosRefin = require('../../../Controllers/Contratos/ControllerContratosRefin');

const ControllerNovoCalculo = require('../../../Controllers/Caculo/ControllerNovo');
const ControllerRefinCalculo = require('../../../Controllers/Caculo/ControllerRefin');
const ControllerTokenAndListOfBank = require('../../../Controllers/Banco/ControllerBanco');
const ControllerLoteSimulacao = require('../../../Controllers/LoteSimulacao/ControllerLoteSimulacao');



routes
.post('/Propostas/Novo', ControllerNovo.propostaNova);
routes
.post('/Propostas/Refin', ControllerRefin.propostaRefin);
routes
.get('/propostas/:id', ControllerProposta.getProposta);

routes
.get('/DataprevBeneficios/:cpf', ControllerGetBeneficios.getBeneficios);
routes
.post('/DataprevBeneficios', ControllerPostBeneficios.postBeneficios);

routes
.get('/Contratos/:cpf', ControllerContratos.getContratos);
routes
.get('/Contratos/:cpf/:idConvenio/Refin', ControllerContratosRefin.getContratosRefin
);

routes
.post('/Calculo/Novo', ControllerNovoCalculo.calculoNovo);
routes
.post('/Calculo/Refin', ControllerRefinCalculo.calculoRefin);

routes
.post('/Token', ControllerToken.token);
routes
.get('/VinculoEmpregaticio/:idConvenio', ControllerVinculoEmpregaticio.vinculoEmpregaticio);
routes
.get('/Blacklist/telefone/:ddd/:telefone', ControllerBlackList.blackList);

routes
.post('/api/v1/Bancos', ControllerTokenAndListOfBank.getBank );

routes.get('/LoteSimulacao/:telefone', ControllerLoteSimulacao.loteSimulacao);

module.exports = routes;