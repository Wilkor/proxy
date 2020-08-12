const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const ControllerToken = require('./Controllers/Token/ControllerToken');
const ControllerVinculoEmpregaticio = require('./Controllers/VinculoEmpregaticio/ControllerVinculoEmpregaticio');
const ControllerBlackList = require('./Controllers/BlackList/ControllerTelefone');

const ControllerNovo = require('./Controllers/Propostas/ControllerNovo');
const ControllerRefin = require('./Controllers/Propostas/ControllerRefin');
const ControllerProposta = require('./Controllers/Propostas/ControllerProposta');

const ControllerGetBeneficios = require('./Controllers/DataPrev/ControllerGetBeneficios');
const ControllerPostBeneficios = require('./Controllers/DataPrev/ControllerPostBeneficios');

const ControllerContratos = require('./Controllers/Contratos/ControllerContratos');
const ControllerContratosRefin = require('./Controllers/Contratos/ControllerContratosRefin');

const ControllerNovoCalculo = require('./Controllers/Caculo/ControllerNovo');
const ControllerRefinCalculo = require('./Controllers/Caculo/ControllerRefin');

const deletSchedule = require('./Controllers/Delete/ControllerDelete');
const ControllerConsultaResource = require('./Controllers/Resources/ControllerConsultaResource');

const ControllerTokenAndListOfBank = require('./Controllers/Banco/ControllerBanco');



/* Crivo */
const ControllerTokenCrivo = require('./ControllersCrivo/Token/ControllerTokenCrivo');
const ControllerCrivo = require('./ControllersCrivo/CrivoContratacaoWhatsApp/ControllerCrivo');
const ControllerCrivoReduced = require('./ControllersCrivo/CrivoContratacaoWhatsApp/ControllerCrivoReduced');
const { Router } = require('express');

/* Crivo - Fim */
const routes = express.Router();

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'vivo' });
});

routes.post('/Novo', ControllerNovo.propostaNova);
routes.post('/Refin', ControllerRefin.propostaRefin);
routes.get('/propostas/:id', ControllerProposta.getProposta);

routes.get('/DataprevBeneficios/:cpf', ControllerGetBeneficios.getBeneficios);
routes.post('/DataprevBeneficios', ControllerPostBeneficios.postBeneficios);

routes.get('/Contratos/:cpf', ControllerContratos.getContratos);
routes.get('/Contratos/:cpf/:idConvenio/Refin',  ControllerContratosRefin.getContratosRefin
);

routes.post('/Calculo/Novo', ControllerNovoCalculo.calculoNovo);
routes.post('/Calculo/Refin', ControllerRefinCalculo.calculoRefin);

routes.post('/Token', ControllerToken.token);
routes.get('/VinculoEmpregaticio/:idConvenio', ControllerVinculoEmpregaticio.vinculoEmpregaticio
);
routes.get('/Blacklist/telefone/:ddd/:telefone', ControllerBlackList.blackList);

routes.post('/api/v1/Bancos', ControllerTokenAndListOfBank.getBank );


/* Crivo */
routes.post('/Crivo/Token', ControllerTokenCrivo.token);
routes.post('/Crivo/CrivoContratacaoWhatsApp', ControllerCrivo.crivo);

routes.post('/CrivoToken', ControllerTokenCrivo.token);
routes.post('/CrivoContratacaoWhatsApp', ControllerCrivo.crivo);

/* Crivo Fim */
///itens a mais

routes.get('/delete', deletSchedule.scheduled);
routes.get('/resource/:id', ControllerConsultaResource.getResource);

module.exports = routes;
