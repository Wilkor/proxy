const axios = require('axios');
const config = require('../../config/index');

DownloadBoleto = (req, res) => {

    const { idContrato, idCliente } = req.params;

    const headers = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': req.headers['authorization']
        }
    }

    axios.
        get(`${config.financeira.baseUrl}/api/v1/epf/Boletos/${idContrato}/Quitacao/${idCliente}/Download`, headers)
        .then((resp) => {
            const jsonText = JSON.stringify(resp.data);
            const responseObject = JSON.parse(jsonText);
            res.json(responseObject);

        }).catch((err) => {

            res.status(err.response.status).json({ error: err.response.data })
        });

}
module.exports = {
    DownloadBoleto
}