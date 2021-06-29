var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', { title: 'Index' });
});

router.get('/projects-list', function(req, res, next) {
  res.render('projects-list.html', { title: 'ProjectsList' });
});

router.get('/edit-test', function(req, res, next) {
  res.render('edit-test.html', { title: 'EditTest' });
});

module.exports = router;
