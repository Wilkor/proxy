const  express = require('express')
const  walk    = require('walk');
const  fs = require("fs");
const  cors = require('cors');
const  app = express();
const axios = require('axios');
const route = require('./routes');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.use(express.json());

app.use(route);

let server = app.listen(process.env.PORT ||3333, function(){
let host = server.address().address, 
     port = server.address().port;
})
