<?php
header('Content-Type: application/json; charset=utf-8');
require '../api/conexion.php';
require '../api/configuracion.php';
require '../api/validacion.php';

parse_str($_SERVER['QUERY_STRING'], $getData);
$putData = json_decode(file_get_contents('php://input'), true);
$antes=substr($putData["FECHA_CREACION_DATE"],0,11);
$hora=substr($putData["FECHA_CREACION_TIME"],11,2);
$despues=substr($putData["FECHA_CREACION_TIME"],13);
$hora-=3;
$date=$antes.$hora.$despues;
if(!titulo_f($putData['TITULO'])){
	echo json_encode([
		'status' => 2,
		'mensaje' => "Titulo invalido. Mínimo 3 caracteres máximo 45."
	]);
	return 0;
}
if(!confesion_f($putData['CONFESION'])){
	echo json_encode([
		'status' => 3,
		'mensaje' => "Confesion invalida, mínimo 5 caracteres."
	]);
	return 0;
}
if(!id_fk_f($putData['FKUSUARIO'])){
	echo json_encode([
		'status' => 4,
		'mensaje' => "Usuario invalido."
	]);
	return 0;
}
if(!fecha_creacion_f($date)){
	echo json_encode([
		'status' => 5,
		'mensaje' => "Fecha invalida."
	]);
	return 0;
}

$id = $getData['id'];
	$query = "UPDATE confesion
          SET TITULO        = '" . mysqli_real_escape_string($db, $putData['TITULO']) . "',
          CONFESION      = '" . mysqli_real_escape_string($db, $putData['CONFESION']) . "',
          FKUSUARIO        = '" . mysqli_real_escape_string($db, $putData['FKUSUARIO']) . "',
          FECHA_CREACION        = '" . mysqli_real_escape_string($db, $date) . "'
          WHERE ID = '" . mysqli_real_escape_string($db, $id) . "'";

$exito = mysqli_query($db, $query);
if($exito) {
    echo json_encode([
        'status' => 1,
        'message' => 'Confesion editada con éxito'
    ]);
} 
else {
    echo json_encode([
        'status' => 0,
        'message' => 'Ups! Hubo un problema, intentelo más tarde'
    ]);
}
