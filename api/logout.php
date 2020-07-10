<?php
	require_once("../api/configuracion.php");

	$_SESSION["token"]=null;
	session_destroy();
	echo "ok";
?>