var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', { title: 'Main' });
});

router.get('/test', function(req, res, next) {
  res.render('test.html', { title: 'Test' });
});

module.exports = router;
