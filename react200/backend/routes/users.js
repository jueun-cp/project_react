const express = require('express');
const app = express();

/* GET users listing. */
app.get('/', function(req, res, next) {
  res.send({'message' : 'node get success'});
});

/* POST users listing.*/
app.post('/', function(req, res, next) {
  //console.log(req);
  //console.log(next);
  
  
  res.send({'message' : 'node post success'});
});
module.exports = app;
