<?php

if (isset($_POST['action'])) {
    switch ($_POST['action']) {
        case 'create':
            create_repo($_POST['repo_name']);
            break;
        case 'edit':
            edit_readme($_POST['repo_name'], $_POST['readme_contents']);
            break;
        case 'delete':
            delete_repo($_POST['repo_name']);
            break;
    }
}

function create_repo($repo_name){
  $data_git = array(
  'name' => $repo_name,
  'auto_init' => 'true'
  );
  $data_string_git = json_encode($data_git);
  $ch_git = curl_init('https://api.github.com/user/repos');
  curl_setopt($ch_git, CURLOPT_CUSTOMREQUEST, "POST");
  curl_setopt($ch_git, CURLOPT_POSTFIELDS, $data_string_git);
  curl_setopt($ch_git, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch_git, CURLOPT_HTTPHEADER, array(
  'Content-Type: application/json',
  'User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 YaBrowser/19.9.3.314 Yowser/2.5 Safari/537.36',
  'Authorization: token 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'
  ));
  $result_git = curl_exec($ch_git);
  echo $result_git;
  $ch_git = curl_init('https://api.github.com/repos/Choi-Eunseok/'.$repo_name.'/contents/README.md');
  curl_setopt($ch_git, CURLOPT_CUSTOMREQUEST, "GET");
  curl_setopt($ch_git, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch_git, CURLOPT_HTTPHEADER, array(
  'Content-Type: application/json',
  'User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 YaBrowser/19.9.3.314 Yowser/2.5 Safari/537.36'
  ));
  $result_git = curl_exec($ch_git);
  echo $result_git;
  $p_git = json_decode($result_git);
  file_put_contents("../sha_list/sha_".$repo_name.".txt",$p_git->sha);
}

function edit_readme($repo_name, $readme_contents){
  $data_git = array(
  'sha' => file_get_contents("../sha_list/sha_".$repo_name.".txt"),
  'message'=> date("Y-m-d H:i:s")." edit",
  'content' => base64_encode($readme_contents),
  );
  $data_string_git = json_encode($data_git);
  $ch_git = curl_init('https://api.github.com/repos/Choi-Eunseok/'.$repo_name.'/contents/README.md');
  curl_setopt($ch_git, CURLOPT_CUSTOMREQUEST, "PUT");
  curl_setopt($ch_git, CURLOPT_POSTFIELDS, $data_string_git);
  curl_setopt($ch_git, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch_git, CURLOPT_HTTPHEADER, array(
  'Content-Type: application/json',
  'User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 YaBrowser/19.9.3.314 Yowser/2.5 Safari/537.36',
  'Authorization: token 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'
  ));
  $result_git = curl_exec($ch_git);
  echo $result_git;
  $p_git = json_decode($result_git);
  file_put_contents("../sha_list/sha_".$repo_name.".txt",$p_git->content->sha);
}

function delete_repo($repo_name){
  $ch_git = curl_init('https://api.github.com/repos/Choi-Eunseok/'.$repo_name);
  curl_setopt($ch_git, CURLOPT_CUSTOMREQUEST, "DELETE");
  curl_setopt($ch_git, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch_git, CURLOPT_HTTPHEADER, array(
  'Content-Type: application/json',
  'User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 YaBrowser/19.9.3.314 Yowser/2.5 Safari/537.36',
  'Authorization: token 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'
  ));
  $result_git = curl_exec($ch_git);
  echo $result_git;
}
?>
