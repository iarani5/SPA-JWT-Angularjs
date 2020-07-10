<?php
$db = mysqli_connect('localhost', 'root', '', 'confesiones');
if(!$db) {
	echo json_encode([
		'status' => 0,
		'message' => 'Error de conexión a la base de datos.'
	]);
	exit;
}