<?php

header('Content-Type: application/json; charset=utf-8');

require '../api/conexion.php';

$query = "SELECT * FROM sexo";
$res = mysqli_query($db, $query);
$array=array();

while($fila = mysqli_fetch_assoc($res)) {
	$array[]=$fila;
} 
$fin=json_encode($array);
echo $fin;
