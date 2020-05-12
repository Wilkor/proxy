const  express = require('express')
const  walk    = require('walk');
const  fs = require("fs");
const  cors = require('cors');
const  app = express();
const axios = require('axios');
const route = require('./routes');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
app.use(cors());
app.use(express.json());

app.use(route);

let server = app.listen(8080, function(){
let host = server.address().address, 
     port = server.address().port;
})
