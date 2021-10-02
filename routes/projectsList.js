var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('projects-list.html', { title: 'ProjectsList' });
});

module.exports = router;
