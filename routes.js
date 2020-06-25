const  express = require('express')
const  cors = require('cors');
const  app = express();

app.use(cors());
app.use(express.json());

const ControllerToken = require('./Controllers/Token/ControllerToken');
const ControllerVinculoEmpregaticio = require('./Controllers/VinculoEmpregaticio/ControllerVinculoEmpregaticio');
const ControllerBlackList = require('./Controllers/BlackList/ControllerTelefone')

const ControllerNovo = require('./Controllers/Propostas/ControllerNovo');
const ControllerRefin = require('./Controllers/Propostas/ControllerRefin');

const ControllerGetBeneficios = require('./Controllers/DataPrev/ControllerGetBeneficios');
const ControllerPostBeneficios = require('./Controllers/DataPrev/ControllerPostBeneficios');

const ControllerContratos = require('./Controllers/Contratos/ControllerContratos');
const ControllerContratosRefin = require('./Controllers/Contratos/ControllerContratosRefin');

const ControllerNovoCalculo = require('./Controllers/Caculo/ControllerNovo');
const ControllerRefinCalculo = require('./Controllers/Caculo/ControllerRefin');

const routes = express.Router();

    routes.get('/', (req, res) => {

        res.status(200).json({message:'vivo'})
    })

    
    routes.post('/Novo', ControllerNovo.propostaNova);
    routes.post('/Refin', ControllerRefin.propostaRefin);
    
    routes.get('DataprevBeneficios/:cpf', ControllerGetBeneficios.getBeneficios);
    routes.post('DataprevBeneficios', ControllerPostBeneficios.postBeneficios);
    
    routes.get('/Contratos/:cpf', ControllerContratos.getContratos);
    routes.get('/Contratos/:cpf/:idConvenio/Refin', ControllerContratosRefin.getContratosRefin);
    
    routes.post('/Calculo/Novo', ControllerNovoCalculo.calculoNovo);
    routes.post('/Calculo/Refin', ControllerRefinCalculo.calculoRefin);
    
    routes.post('/Token', ControllerToken.token);
    routes.get('/VinculoEmpregaticio/:idConvenio', ControllerVinculoEmpregaticio.vinculoEmpregaticio);
    routes.get('/Blacklist/telefone/:ddd/:telefone', ControllerBlackList.blackList)

  
module.exports = routes;


