var express = require('express');
var router = express.Router();
var mysql = require('mysql');		// node-mysql을 install하고 모듈을 불러와야한다.
var conn = mysql.createConnection({ // mysql과 connection하는 부분
    host     : 'us-cdbr-east-04.cleardb.com',
    user     : 'b7734fb5a35b0e',
    password : 'dce9aa9e',
    database : 'heroku_7eba0b4eba8973c'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/list/add', function(req, res){
    var name = req.body.name;
    var readme = req.body.readme;
    var sql = 'INSERT INTO list (name, readme) VALUES(?, ?)';
    var params = [name, readme];
    conn.query(sql, params, function(err, result, fields){
        if(err) {
          res.status(500).send('Internal Server Error');
        }else{
          var sql = 'SELECT * FROM list WHERE name=?';
          conn.query(sql, [name], function(err, row, fields){
            if(err) {
              res.status(500).send('Internal Server Error');
            } else {
              res.send(row[0]);
            }
          });
        }
    });
});

app.post('/list/edit', function(req, res){
    var sql = 'UPDATE list SET readme=? WHERE name=?';
    var readme = req.body.readme;
    var id = req.params.name;
    conn.query(sql, [readme, name], function(err, result, fields){
      if(err) {
        res.status(500).send('Internal Server Error');
      } else {
        var sql = 'SELECT * FROM list WHERE name=?';
        conn.query(sql, [name], function(err, row, fields){
          if(err) {
            res.status(500).send('Internal Server Error');
          } else {
            res.send(row[0]);
          }
        });
      }
    });
});

app.post('/list/delete', function(req, res){
    var name = req.params.name;
    var sql = 'DELETE FROM list WHERE name=?';
    conn.query(sql, [name], function(err, result){
      if(!err) res.send('success');
    });
});

router.get(['/list','/list/:name'], function(req, res){
    var sql = 'SELECT * FROM list';
    conn.query(sql, function(err, rows, fields){
      var name = req.params.name;
      if(name){
        var sql = 'SELECT * FROM list WHERE name=?';
        conn.query(sql, [name], function(err, row, fields){
          if(err) {
            res.status(500).send('Internal Server Error');
          } else {
            res.send(row[0]);
          }
        });
      } else {
        res.send({list : rows})
      }
    });
});

module.exports = router;
