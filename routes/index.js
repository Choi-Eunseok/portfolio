var express = require('express');
var router = express.Router();
// var mysql = require('mysql');		// node-mysql을 install하고 모듈을 불러와야한다.
// var conn = mysql.createConnection({ // mysql과 connection하는 부분
//     host     : 'us-cdbr-east-04.cleardb.com',
//     user     : 'b7734fb5a35b0e',
//     password : 'dce9aa9e',
//     database : 'heroku_7eba0b4eba8973c'
// });
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', { title: 'Index' });
});

router.get('/edit-test', function(req, res, next) {
  res.render('edit-test.html', { title: 'EditTest' });
});
//
// app.get('/topic/add', function(req, res){ //add 페이지 불러오기
//     var sql = 'SELECT * FROM list'; // topic의 모든 id와 title 불러오기
//     conn.query(sql, function(err, topics, fields){
//       if(err){
//         console.log(err);
//         res.status(500).send('Internal Server Error')
//       }
//         res.render('add', { topics: topics }); //topics라는 배열안에 JSON형식으로 데이터들이 담겨있음. topics라는 변수에 데이터를 담아 add.ejs로 넘겨준다.
//     });
// });
//
// app.post('/topic/add', function(req, res){ // add.ejs에서 form태그의 post방식으로 데이터를 받는다.
//     var name = req.body.name;				//	request 객체의 body객체의 title값.
//     var readme = req.body.readme;
//     var sql = 'INSERT INTO list (name, readme) VALUES(?, ?)';// INSERT 쿼리를 통해 데이터를 추가한다. VALUES의 물음표는 아래의 함수의 두번째 인자로 전달할 수 있다.
//     var params = [name, readme];// 사용자에게 request받은 값들.
//     conn.query(sql, params, function(err, result, fields){ // db에 query를 날린다. 1번째 인자로 sql문과, 배열 안에 담긴 값들, 그리고 함수를 전달한다.
//         if(err) {
//           console.log(err); //에러가 있다면, 보안을 위해 콘솔에 err로그를 찍고,
//           res.status(500).send('Internal Server Error'); //사용자에게는 err로그를 보여주지 않는다.
//         }
//         console.log('The file has been saved!');//데이터가 db에 잘 저장 되었다면, 콘솔에 성공이라 찍는다.
//         res.redirect('/topic/'+result.insertId);//새로운 데이터가 insert될때, 자동으로 생기는 id가 있는데, query 함수의 두번째 인자인 result 객체에서 insertId라는 키로 그 값인 id를 찾을 수 있다. 그것을 통하여 새로 생긴 데이터의 화면을 바로 띄워줄 수 있다.
//     });
// });

module.exports = router;
