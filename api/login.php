<?php
header('Content-Type: application/json; charset=utf-8');
require '../vendor/autoload.php';
require '../api/conexion.php';
require '../api/configuracion.php';
require '../api/validacion.php';
use Emarref\Jwt\Claim;

$postData = json_decode(file_get_contents('php://input'), true);

if(!email_f($postData['MAIL'])){
	echo json_encode([
		'status' => 2,
		'mensaje' => "Mail invalido"
	]);
	return 0;
}
if(!clave_f($postData['CONTRASENIA'])){
	echo json_encode([
		'status' => 3,
		'mensaje' => "Contraseña inválida, mínimo 3 caracteres máximo 15, sin espacios."
	]);
	return 0;
}

$mail = mysqli_real_escape_string($db, $postData['MAIL']);
$contrasenia = mysqli_real_escape_string($db, $postData['CONTRASENIA']);
$query = "SELECT * FROM usuario
		WHERE MAIL = '$mail'
		AND CONTRASENIA = md5('$contrasenia')";

$res = mysqli_query($db, $query);

if($fila = mysqli_fetch_assoc($res)) {
	$payload = new Emarref\Jwt\Token();
	$payload->addClaim(new Claim\Expiration(new \DateTime('1 week')));
	$payload->addClaim(new Claim\Issuer('Confesiones'));
	$jwt = new Emarref\Jwt\Jwt();
	$algorithm = new Emarref\Jwt\Algorithm\Hs256('oiAGkvbl324wpoefvklsfSD/AF_SDcvs');
	$encryption = Emarref\Jwt\Encryption\Factory::create($algorithm);
	$serializedToken = $jwt->serialize($payload, $encryption);
	$_SESSION["s_id"]=$fila["ID"];
	$_SESSION["s_nivel"]=$fila["NIVEL"];
	$_SESSION["token"]=$serializedToken;

	echo json_encode([
		'status' => 1,
		'data' => [
			'token' => $serializedToken,
			'ID' => $fila['ID'],
			'USUARIO' => $fila['USUARIO'],
			'NIVEL' => $fila['NIVEL']
		]
	]);
} 
else {
	echo json_encode([
		'status' => 0,
		'mensaje' => "Usuario o contraseña inválidos."
	]);
}

