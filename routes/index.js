var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', { title: 'Main' });
});

router.get('/prjects-list', function(req, res, next) {
  res.render('prjects-list.html', { title: 'Test' });
});

module.exports = router;
