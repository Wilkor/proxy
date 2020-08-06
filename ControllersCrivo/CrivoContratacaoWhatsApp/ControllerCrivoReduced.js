const axios = require('axios');
const config = require('../../config/index');

crivo = (req, res) => {
    const headers = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: req.headers['authorization'],
        },
    };

    axios
        .post(
            `${config.crivo.baseUrl}/api/v1/CrivoContratacaoWhatsApp`,
            req.body,
            headers
        )
        .then((resp) => {
            const jsonText = JSON.stringify(resp.data);
            const responseObject = JSON.parse(jsonText);
            const reduced = responseObject.variaveis.filter((obj) => {
                return (
                    obj.driver === '(SAW) Política Auto Contratação Web - PF' &&
                    obj.tipo === 'variavel'
                );
            });
            const validaCrivo = {
                validaCrivo: reduced[0].valorVariavel,
            };

            res.json(validaCrivo);
        })
        .catch((err) => {
            res.status(err.response.status).json({ error: err.response.data });
        });
};
module.exports = {
    crivo,
};
