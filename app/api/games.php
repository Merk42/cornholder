<?php
include "config.php";

$data = json_decode(file_get_contents("php://input"));

$request = $data->request;
$league_id = $_GET['league_id'];
// Fetch All records
if($request != 3 && $request != '3'){
  $userData = mysqli_query($con,"select * from games WHERE league_id=".$league_id."' order by id asc");

  $response = array();
  while($row = mysqli_fetch_assoc($userData)){
    $response[] = $row;
  }

  echo json_encode($response);
  exit;
}

if($request == 3 || $request == '3') {
  $game_id = $data->game_id;
  $game_1_visitor_score = $data->game_1_visitor_score;
  $game_1_home_score = $data->game_1_home_score;
  $game_2_visitor_score = $data->game_2_visitor_score;
  $game_2_home_score = $data->game_2_home_score;
  $game_3_visitor_score = $data->game_3_visitor_score;
  $game_3_home_score = $data->game_3_home_score;

  mysqli_query($con,"UPDATE games SET game_1_visitor_score = '".$game_1_visitor_score."''', game_1_home_score = '".$game_1_home_score."''', game_2_visitor_score = '".$game_2_visitor_score."'', game_2_home_score = '".$game_2_home_score."'', game_3_visitor_score = '".$game_3_visitor_score."'', game_3_home_score = '".$game_3_home_score."'' WHERE id='".$game_id);


  echo "Update successfully";
  exit;
}
?>