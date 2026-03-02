<?php

$host = "mysql.markecurtis.com"; /* Host name */
$user = "totes"; /* User */
$password = "thesmurfs"; /* Password */
$dbname = "totes"; /* Database name */

$con = mysqli_connect($host, $user, $password,$dbname);
// $mysqli->options(MYSQLI_OPT_INT_AND_FLOAT_NATIVE, TRUE);
// Check connection
if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}
error_reporting(E_ALL); // Reports all errors
ini_set('display_errors', '1'); // Shows errors in the browser
ini_set('display_startup_errors', '1'); // Shows errors that occur during PHP startup
?>