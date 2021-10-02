var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('edit-test.html', { title: 'EditTest' });
});

module.exports = router;
