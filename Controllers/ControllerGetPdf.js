const axios = require('axios');
const  fs = require("fs");

getPdf = (req, res) => {

  const {id} = req.params;
  if (id === 'YmFuY29zYWZyYTEyMw==') {

      let file = fs.createReadStream('../public/Building Node Applications with MongoDB and Backbone.pdf');
          let stat = fs.statSync('../public/Building Node Applications with MongoDB and Backbone.pdf');
          res.setHeader('Content-Length', stat.size);
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
          file.pipe(res);
            
      } 
  }

module.exports = {
  getPdf
}
