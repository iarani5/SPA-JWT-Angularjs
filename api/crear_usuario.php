<?php
//header('Content-Type: application/json; charset=utf-8');
require '../api/conexion.php';
require '../api/configuracion.php';
require '../api/validacion.php';

$putData = json_decode(file_get_contents('php://input'), true);

if(!isset($putData["FKSEXO"])){
	$putData["FKSEXO"]="3";
}
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
if(!clave_f($putData['CONTRASENIA'])){
	echo json_encode([
		'status' => 4,
		'mensaje' => "Contraseña inválida, mínimo 3 caracteres máximo 15, sin espacios."
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

if(!(isset($_SESSION["s_nivel"])&&$_SESSION["s_nivel"]=="admin")){
	$putData['NIVEL']="usuario";
}
$query = "INSERT INTO usuario (USUARIO, MAIL, CONTRASENIA, NIVEL, FECHA_NACIMIENTO, FKSEXO)  
			VALUES ('" . mysqli_real_escape_string($db, $putData['USUARIO']) . "', '" . mysqli_real_escape_string($db, $putData['MAIL']) . "', md5('" . mysqli_real_escape_string($db, $putData['CONTRASENIA']) . "'), '" . mysqli_real_escape_string($db, $putData['NIVEL']) . "', '" . mysqli_real_escape_string($db, $putData['FECHA_NACIMIENTO']) . "', '" . mysqli_real_escape_string($db, $putData['FKSEXO']) . "')";

$exito = mysqli_query($db, $query);
if($exito) {
    echo json_encode([
        'status' => 1,
        'message' => 'Usuario creado.'
    ]);
} 
else {
    echo json_encode([
        'status' => 0,
        'message' => 'Error al crear usuario.'
    ]);
}
