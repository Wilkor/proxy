const express = require('express')
const cors = require('cors');
const app = express();
const helmet = require('helmet')
const bodyParser = require('body-parser');
const config = require('./src/utils/index');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

    app.use(helmet());
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(cors());
    app.use(express.json());

    let fileRoutes = config.readRecursiveDirectory('routes')
    .filter(item => {
        return item !== '';
    });


    fileRoutes.forEach(file => {
        let rf = require('./src/' + file.replace('.js', ''));
        let fn = file
            .replace('routes', '')
            .split('\\')
            .join('/')
            .replace('.js', '');
        app.use(fn, rf);
        console.log('Rota ' + fn + ' --> ok!');
    });



    let server = app.listen(process.env.PORT ||3333, function(){
    let host = server.address().address, 
        port = server.address().port;
    })
