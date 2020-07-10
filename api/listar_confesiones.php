<?php
header('Content-Type: application/json; charset=utf-8');

require '../api/conexion.php';
require '../api/configuracion.php';

$query = "SELECT * FROM confesion";
$res = mysqli_query($db, $query);
$array=array();

while($fila = mysqli_fetch_assoc($res)) {
	$fila["TITULO"]=print_f($fila["TITULO"]);
	$fila["CONFESION"]=print_f($fila["CONFESION"]);
	$array[]=$fila;
} 
$fin=json_encode($array);
echo $fin;
