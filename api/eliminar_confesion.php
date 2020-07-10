<?php
header('Content-Type: application/json; charset=utf-8');
require '../api/conexion.php';
require '../api/configuracion.php';

parse_str($_SERVER['QUERY_STRING'], $deleteData);
$id = mysqli_real_escape_string($db, $deleteData['id']);

$query = "DELETE FROM confesion
		WHERE ID = '$id'";

$exito = mysqli_query($db, $query);

if($exito) {
    echo json_encode([
        'status' => 1,
        'message' => 'Usuario eliminado exitosamente.'
    ]);
} 
else {
    echo json_encode([
        'status' => 0,
        'message' => 'Error al eliminar el usuario.'
    ]);
}