var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("this is main");
  //res.render('index', { title: 'Express' }); 
  //views/index.js 파일에 있는 것을 뿌려줌
});

module.exports = router;
