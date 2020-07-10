<?php
header('Content-Type: application/json; charset=utf-8');

require '../api/conexion.php';
require '../api/configuracion.php';

$id = mysqli_real_escape_string($db, $_GET['id']);

$query = "SELECT * FROM confesion WHERE ID = '$id'";
$res = mysqli_query($db, $query);
$ans=mysqli_fetch_assoc($res);
if($ans==NULL){
	echo json_encode([
		'status' => 0,
		'message' => "No tenes permiso para realizar esta acción."
	]);
	return 0;
}
else{
	foreach($ans as $i=>$item){
		$ans[$i]=print_f($ans[$i]);
	}
	echo json_encode([
		'status' => 1,
		'confesion' => $ans
	]);
}