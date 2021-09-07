var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var request = require('request');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

function create_repo(repo_name){
  var jsonDataObj = {
    name : repo_name,
    auto_init : true};
  const options = {
    url: 'https://api.github.com/user/repos',
    body: jsonDataObj,
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 YaBrowser/19.9.3.314 Yowser/2.5 Safari/537.36',
      'Authorization': 'token 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'}
  };
  request.post(options, function(error,response,body){});

  //var fWrite = fileObject.OpenTextFile("./public/list.txt", 8);
	//fWrite.write('#'+repo_name);
	//fWrite.close();
}

function get_readme_sha(repo_name){
  var result_json;
  const options = {
    url: 'https://api.github.com/repos/Choi-Eunseok/'+repo_name+'/contents/README.md',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 YaBrowser/19.9.3.314 Yowser/2.5 Safari/537.36'
    }
  };
  request.get(options, function(error,response,body){
    result_json = res.json(JSON.parse(body));
  });
  return result_json.sha;
}

function edit_readme(repo_name, readme_content){
  var today = new Date();
  var jsonDataObj = {
    sha : get_readme_sha(repo_name),
    message : today.toLocaleString() + ' edit',
    content : readme_content};
  const options = {
    url: 'https://api.github.com/repos/Choi-Eunseok/'+repo_name+'/contents/README.md',
    body: jsonDataObj,
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 YaBrowser/19.9.3.314 Yowser/2.5 Safari/537.36',
      'Authorization': 'token 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'}
  };
  request.put(options, function(error,response,body){});
}

function delete_repo(repo_name){
  const options = {
    url: 'https://api.github.com/repos/Choi-Eunseok/'+repo_name,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 YaBrowser/19.9.3.314 Yowser/2.5 Safari/537.36',
      'Authorization': 'token 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'}
  };
  request.delete(options, function(error,response,body){});
}
