var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/react', function(req, res) {
  res.render('index_react', { title: 'React Index' });
});

module.exports = router;
