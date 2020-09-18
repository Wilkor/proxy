const express = require('express');
const routes = express.Router();

const question = require('../../../Bigid/Questions/question');
const answer = require('../../../Bigid/Answers/answer');


routes.post('/Question', question.questions);
routes.post('/Answers', answer.answers);

module.exports = routes;