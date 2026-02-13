<?php

$host = "mysql.markecurtis.com"; /* Host name */
$user = "totes"; /* User */
$password = "thesmurfs"; /* Password */
$dbname = "totes"; /* Database name */

$con = mysqli_connect($host, $user, $password,$dbname);
// Check connection
if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}

?>