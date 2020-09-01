const express = require('express');
const routes = express.Router();

const ControllerTokenCrivo = require('../../../ControllersCrivo/Token/ControllerTokenCrivo');
const ControllerCrivo = require('../../../ControllersCrivo/CrivoContratacaoWhatsApp/ControllerCrivo');

routes.post('/Token', ControllerTokenCrivo.token);
routes.post('/CrivoContratacaoWhatsApp', ControllerCrivo.crivo);

module.exports = routes;