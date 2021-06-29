var request = require('request');

function create_repo(repo_name){
  var jsonDataObj = {
    name : repo_name,
    auto_init : true};
  const options = {
    uri: 'https://api.github.com/user/repos',
    body: jsonDataObj,
    json: true,
    headers: {
      Content-Type: 'application/json',
      User-Agent: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 YaBrowser/19.9.3.314 Yowser/2.5 Safari/537.36',
      Authorization: 'token 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'}
  }
  request.post(options, function(err,httpResponse,body){});
}

function get_readme_sha(repo_name){
  var result_json;
  const options = {
    uri: 'https://api.github.com/repos/Choi-Eunseok/'+repo_name+'/contents/README.md',
    headers: {
      Content-Type: 'application/json',
      User-Agent: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 YaBrowser/19.9.3.314 Yowser/2.5 Safari/537.36',
  }
  request.get(options, function(err,httpResponse,body){
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
    uri: 'https://api.github.com/repos/Choi-Eunseok/'+repo_name+'/contents/README.md',
    body: jsonDataObj,
    json: true,
    headers: {
      Content-Type: 'application/json',
      User-Agent: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 YaBrowser/19.9.3.314 Yowser/2.5 Safari/537.36',
      Authorization: 'token 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'}
  }
  request.put(options, function(err,httpResponse,body){});
}

function delete_repo(repo_name){
  const options = {
    uri: 'https://api.github.com/repos/Choi-Eunseok/'+repo_name,
    headers: {
      Content-Type: 'application/json',
      User-Agent: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 YaBrowser/19.9.3.314 Yowser/2.5 Safari/537.36',
      Authorization: 'token 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'}
  }
  request.delete(options, function(err,httpResponse,body){});
}
