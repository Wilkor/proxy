const express = require('express');
const routes = express.Router();

const ControllerTokenCrivo = require('../../../ControllersCrivo/Token/ControllerTokenCrivo');
const ControllerCrivo = require('../../../ControllersCrivo/CrivoContratacaoWhatsApp/ControllerCrivo');
const ControllerCrivoReduced = require('../../../ControllersCrivo/CrivoContratacaoWhatsApp/ControllerCrivoReduced');

routes.post('/CrivoToken', ControllerTokenCrivo.token);
routes.post('/CrivoContratacaoWhatsApp', ControllerCrivo.crivo);
routes.post('/CrivoContratacaoWhatsAppReduced', ControllerCrivoReduced.crivo);

module.exports = routes;