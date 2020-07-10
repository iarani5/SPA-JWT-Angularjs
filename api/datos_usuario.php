<?php
header('Content-Type: application/json; charset=utf-8');

require '../api/conexion.php';
require '../api/configuracion.php';
require '../vendor/autoload.php';

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

	$id = mysqli_real_escape_string($db, $_GET['id']);

	$query = "SELECT * FROM usuario WHERE ID = '$id'";
	$res = mysqli_query($db, $query);

	echo json_encode([
		'status' => 1,
		'usuario' => mysqli_fetch_assoc($res)
	]);
}
