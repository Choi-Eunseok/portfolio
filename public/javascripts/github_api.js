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
  .then(data=>console.log(repo_name+" created"))

  fetch('https://choi-es.herokuapp.com/dbedit/list/add',{
    method: 'POST',
    body: new URLSearchParams({
      name : repo_name,
      readme : ' '
    })
  })
  .then(data=>console.log(repo_name+" saved"))
}

function get_readme(repo_name){
  // fetch('https://api.github.com/repos/Choi-Eunseok/'+repo_name+'/contents/README.md',{
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 YaBrowser/19.9.3.314 Yowser/2.5 Safari/537.36'}
  // })
  // .then(response=>response.json())
  // .then(response=>{
  //   var content = response.content;
  //   console.log(atob(content));
  // })
  fetch('https://choi-es.herokuapp.com/dbedit/list/'+repo_name,{
    method: 'GET'
  })
  .then(response=>response.json())
  .then(response=>{
    var content = response.readme;
    console.log(content);
  })
}

function edit_readme(repo_name, readme_content){
  fetch('https://api.github.com/repos/Choi-Eunseok/'+repo_name+'/contents/README.md',{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 YaBrowser/19.9.3.314 Yowser/2.5 Safari/537.36'}
  })
  .then(response=>response.json())
  .then(response=>{
    var sha = response.sha;
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
    .then(data=>console.log(repo_name+" edited"))
  })

  fetch('https://choi-es.herokuapp.com/dbedit/list/edit',{
    method: 'POST',
    body: new URLSearchParams({
      name : repo_name,
      readme : readme_content
    })
  })
  .then(data=>console.log(repo_name+" saved"))
}

function delete_repo(repo_name){
  fetch('https://api.github.com/repos/Choi-Eunseok/'+repo_name,{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 YaBrowser/19.9.3.314 Yowser/2.5 Safari/537.36',
      'Authorization': 'token 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'}
  })
  console.log(repo_name+" deleted");

  fetch('https://choi-es.herokuapp.com/dbedit/list/delete',{
    method: 'POST',
    body: new URLSearchParams({
      name : repo_name
    })
  })
  .then(response=>response.json())
  .then(data=>console.log(repo_name+" deleted"))
}

function list_project(text_area){
  fetch('https://choi-es.herokuapp.com/dbedit/list',{
    method: 'GET'
  })
  .then(response=>response.json())
  .then(response=>{
    response.list.forEach(function(element){
      text_area.innerText = text_area.innerText + '\n' + JSON.stringify(element);
    });
  })
}
