

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

async function get_readme_sha(repo_name){
  var sha = "";
  fetch('https://api.github.com/repos/Choi-Eunseok/'+repo_name+'/contents/README.md',{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 YaBrowser/19.9.3.314 Yowser/2.5 Safari/537.36'}
  })
  .then(response=>response.json())
  .then(response=>{
    console.log(response.sha);
    return response.sha;
  })
  //console.log(sha);
  //return sha;
}

async function edit_readme(repo_name, readme_content){
  fetch('https://api.github.com/repos/Choi-Eunseok/'+repo_name+'/contents/README.md',{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 YaBrowser/19.9.3.314 Yowser/2.5 Safari/537.36'}
  })
  .then(response=>response.json())
  .then(response=>{
    console.log(response.sha);
    var sha = response.sha;
    console.log(sha);
    var today = new Date();
    var jsonDataObj = {
      sha : sha,
      message : today.toLocaleString() + ' edit',
      content : btoa(readme_content)};
    fetch('https://api.github.com/repos/Choi-Eunseok/'+repo_name+'/contents/README.md',{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 YaBrowser/19.9.3.314 Yowser/2.5 Safari/537.36',
        'Authorization': 'token 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'},
      body: JSON.stringify(jsonDataObj)
    })
    .then(response=>response.json())
    .then(data=>console.log(data))
  })
}

function delete_repo(repo_name){
  fetch('https://api.github.com/repos/Choi-Eunseok/'+repo_name,{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 YaBrowser/19.9.3.314 Yowser/2.5 Safari/537.36',
      'Authorization': 'token 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'}
  })
}
