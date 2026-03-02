<?php
include "config.php";

$data = json_decode(file_get_contents("php://input"));

$request = $data->request;
$league_id = $_GET['league_id'];

// Fetch All records
if($request != 3 && $request != '3'){
  $userData = mysqli_query($con,"select * from championship WHERE league_id=".$league_id." order by id asc");

  $response = array();
  while($row = mysqli_fetch_assoc($userData)){
    $response[] = $row;
  }

  echo json_encode($response);
  exit;
}


if($request == 3 || $request == '3') {
  $winner_id = $data->winner_id;
  $winner_game_id = $data->winner_game_id;
  $winner_game_position = $data->winner_game_position;
  if ($winner_game_position == 0) {
    mysqli_query($con,"UPDATE championship SET visitor_id='".$winner_id."' WHERE id=".$winner_game_id);
  }
  if ($winner_game_position == 1) {
    mysqli_query($con,"UPDATE championship SET home_id='".$winner_id."' WHERE id=".$winner_game_id);
  }
  echo "Update successfully";
  exit;
}
?>