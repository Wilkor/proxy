const express = require('express');
const routes = express.Router();

const deletSchedule = require('../../../Controllers/Delete/ControllerDelete');
const ControllerConsultaResource = require('../../../Controllers/Resources/ControllerConsultaResource');


routes.get('/delete', deletSchedule.scheduled);
routes.get('/resource/:id', ControllerConsultaResource.getResource);

module.exports = routes;