<?php
include "config.php";

$data = json_decode(file_get_contents("php://input"));

$request = $data->request;
$league_id = $_GET['league_id'];
// Fetch All records
// if($request == 1){
  $userData = mysqli_query($con,"select * from games WHERE league_id=".$league_id." order by id asc");

  $response = array();
  while($row = mysqli_fetch_assoc($userData)){
    $response[] = $row;
  }

  echo json_encode($response);
  exit;
// }
?>