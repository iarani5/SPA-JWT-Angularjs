<?php
//header('Content-Type: application/json; charset=utf-8');
require '../api/conexion.php';
require '../api/configuracion.php';
require '../api/validacion.php';
require '../vendor/autoload.php';

$putData = json_decode(file_get_contents('php://input'), true);
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

if(!isset($_SESSION['token'])){
	echo json_encode([
        'status' => 0,
        'message' => 'Error. Usuario no autenticado.'
    ]);
    exit;
}
else{
	$serializedToken = $_SESSION['token'];
	if(empty($serializedToken) || $serializedToken == 'null') {
		echo json_encode([
			'status' => 0,
			'message' => 'Error. Usuario no autenticado.'
		]);
		exit;
	}
	try {
		$jwt = new Emarref\Jwt\Jwt();
		$token = $jwt->deserialize($serializedToken);
		$algorithm = new Emarref\Jwt\Algorithm\Hs256('oiAGkvbl324wpoefvklsfSD/AF_SDcvs');
		$encryption = Emarref\Jwt\Encryption\Factory::create($algorithm);
		$context = new Emarref\Jwt\Verification\Context($encryption);
		$context->setIssuer('Confesiones');
		$jwt->verify($token, $context);
	} 
	catch (Emarref\Jwt\Exception\VerificationException $e) {
		echo json_encode([
			'status' => 0,
			'message' => 'Error. Usuario no autenticado.'
		]);
		exit;
	}


	$putData["FECHA_CREACION"]=getDateTimeNow();
	$putData["FKUSUARIO"]=$_SESSION["s_id"];

	$query = "INSERT INTO confesion (TITULO, CONFESION, FECHA_CREACION, FKUSUARIO)  
				VALUES ('" . mysqli_real_escape_string($db, $putData['TITULO']) . "', '" . mysqli_real_escape_string($db, $putData['CONFESION']) . "', '" . mysqli_real_escape_string($db, $putData['FECHA_CREACION']) . "', '" . mysqli_real_escape_string($db, $putData['FKUSUARIO']) . "')";

	$exito = mysqli_query($db, $query);
	if($exito) {
		echo json_encode([
			'status' => 1,
			'message' => 'Confesion creada.'
		]);
	} 
	else {
		echo json_encode([
			'status' => 0,
			'message' => 'Error al crear confesion.'
		]);
	}
}
