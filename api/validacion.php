<?php	
	function usuario_f($var){
		$exp="/^[a-záéíóúñ\s]{4,15}$/i";
		return preg_match($exp, $var);
	}	
	function nivel_f($var){
		$exp="/^admin|usuario$/";
		return preg_match($exp, $var);
	}
	function fecha_nacimiento_f($var){
		$exp="/^(19[2-9][0-9])-(0?[1-9]|1[0-2])-(0?[1-9]|1[0-9]|2[0-9]|3[0-1])/";
		return preg_match($exp,$var);
	}
	function email_f($var){
		$exp="/^[a-zA-Z\d\-\.\_]{3,25}@[a-z]{3,15}\.[a-z]{2,4}$/";
		return preg_match($exp, $var);
	}
	function clave_f($var){
		$exp="/^[a-zA-Z\d_#,;~@%&\\\!\$\^\*\(\)\-\+\=\{\}\[\]\:\'\\<\>\.\?\|]{3,15}$/";
		return preg_match($exp, $var);
	}
	function id_fk_f($var){
		$exp="/^[\d]+$/";
		return preg_match($exp, $var);
	}
	function fksexo_f($var){
		$exp="/^1|2|3$/";
		return preg_match($exp, $var);
	}
	function titulo_f($var){
		$exp="/^[a-záéíóúñ\s\!\?]{3,45}$/i";
		return preg_match($exp, $var);
	}	
	function confesion_f($var){
		if(strlen($var)>=5){
			return 1;
		}
	}	
	function fecha_creacion_f($var){
		$exp="/^(19[2-9][0-9]|20[0-1][0-6])-(0?[1-9]|1[0-2])-(0?[1-9]|1[0-9]|2[0-9]|3[0-1])/";
		return preg_match($exp, $var);
	}
	
