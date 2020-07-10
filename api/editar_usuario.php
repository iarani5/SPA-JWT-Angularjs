<?php
header('Content-Type: application/json; charset=utf-8');
require '../api/conexion.php';
require '../api/configuracion.php';
require '../api/validacion.php';

parse_str($_SERVER['QUERY_STRING'], $getData);
$putData = json_decode(file_get_contents('php://input'), true);

if(!usuario_f($putData['USUARIO'])){
	echo json_encode([
		'status' => 2,
		'mensaje' => "Usuario invalido. Mínimo 4 caracteres máximo 15. Solo letras."
	]);
	return 0;
}
if(!email_f($putData['MAIL'])){
	echo json_encode([
		'status' => 3,
		'mensaje' => "Mail invalido"
	]);
	return 0;
}
if(!fksexo_f($putData['FKSEXO'])){
	echo json_encode([
		'status' => 5,
		'mensaje' => "Sexo inválido."
	]);
	return 0;
}
if(!fecha_nacimiento_f($putData['FECHA_NACIMIENTO'])){
	echo json_encode([
		'status' => 6,
		'mensaje' => "Fecha de nacimiento inválida (+18)."
	]);
	return 0;
}
if(!nivel_f($putData['NIVEL'])){
	echo json_encode([
		'status' => 7,
		'mensaje' => "Nivel inválido."
	]);
	return 0;
}

$id = $getData['id'];
if($putData["CONTRASENIA"]==""){
	$query = "UPDATE usuario
          SET USUARIO        = '" . mysqli_real_escape_string($db, $putData['USUARIO']) . "',
              MAIL      = '" . mysqli_real_escape_string($db, $putData['MAIL']) . "',
              NIVEL        = '" . mysqli_real_escape_string($db, $putData['NIVEL']) . "',
              FECHA_NACIMIENTO   = '" . mysqli_real_escape_string($db, $putData['FECHA_NACIMIENTO']) . "',
              FKSEXO   = '" . mysqli_real_escape_string($db, $putData['FKSEXO']) . "'
          WHERE ID = '" . mysqli_real_escape_string($db, $id) . "'";
}
else{
	if(!clave_f($putData['CONTRASENIA_NUEVA'])){
		echo json_encode([
			'status' => 4,
			'mensaje' => "Contraseña inválida, mínimo 3 caracteres máximo 15, sin espacios."
		]);
		return 0;
	}
	$query1="SELECT CONTRASENIA FROM usuario WHERE ID='$id'";
	$exito = mysqli_query($db, $query1);
	if(md5($putData["CONTRASENIA"])==mysqli_fetch_assoc($exito)["CONTRASENIA"]){
		$query = "UPDATE usuario
          SET USUARIO        = '" . mysqli_real_escape_string($db, $putData['USUARIO']) . "',
              MAIL      = '" . mysqli_real_escape_string($db, $putData['MAIL']) . "',
              CONTRASENIA  = md5('" . mysqli_real_escape_string($db, $putData['CONTRASENIA_NUEVA']) . "'),
              NIVEL        = '" . mysqli_real_escape_string($db, $putData['NIVEL']) . "',
              FECHA_NACIMIENTO   = '" . mysqli_real_escape_string($db, $putData['FECHA_NACIMIENTO']) . "',
              FKSEXO   = '" . mysqli_real_escape_string($db, $putData['FKSEXO']) . "'
          WHERE ID = '" . mysqli_real_escape_string($db, $id) . "'";
	}
	else {
		echo json_encode([
			'status' => 0,
			'message' => 'La contraseña es incorrecta.'
		]);
		return 0;
	}
}
$exito = mysqli_query($db, $query);
if($exito) {
    echo json_encode([
        'status' => 1,
        'message' => 'Usuario editado con éxito'
    ]);
} 
else {
    echo json_encode([
        'status' => 0,
        'message' => 'Ups! Hubo un problema, intentelo más tarde'
    ]);
}