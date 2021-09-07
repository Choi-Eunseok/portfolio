

function create_repo(repo_name){
  var jsonDataObj = {
    name : repo_name,
    auto_init : true};
  fetch('https://api.github.com/user/repos',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 YaBrowser/19.9.3.314 Yowser/2.5 Safari/537.36',
      'Authorization': 'token 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'},
    body: JSON.stringify(jsonDataObj)
  })
  .then(response=>response.json())
  .then(data=>console.log(data))

}

function get_readme_sha(repo_name){
  // var result_json;
  // const options = {
  //   url: 'https://api.github.com/repos/Choi-Eunseok/'+repo_name+'/contents/README.md',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 YaBrowser/19.9.3.314 Yowser/2.5 Safari/537.36'
  //   }
  // };
  // request.get(options, function(error,response,body){
  //   result_json = res.json(JSON.parse(body));
  // });
  // return result_json.sha;
  fetch('https://api.github.com/repos/Choi-Eunseok/'+repo_name+'/contents/README.md',{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 YaBrowser/19.9.3.314 Yowser/2.5 Safari/537.36'}
  })
  .then(response=>response.json())
  .then(data=>console.log(data.sha))
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
  fetch('https://api.github.com/repos/Choi-Eunseok/'+repo_name,{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 YaBrowser/19.9.3.314 Yowser/2.5 Safari/537.36',
      'Authorization': 'token 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'},
    body: JSON.stringify(jsonDataObj)
  })
  .then(response=>response.json())
  .then(data=>console.log(data))
}
