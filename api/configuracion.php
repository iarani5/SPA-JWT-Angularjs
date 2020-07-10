<?php
date_default_timezone_set( "America/Argentina/Buenos_Aires" );
session_start();

function print_f($str){
	$cod=mb_detect_encoding($str,'UTF-8,ISO-8859-1');
	$str=iconv($cod,'UTF-8',$str);
	return $str;
}

function getDatetimeNow() {
	$tz_object = new DateTimeZone('America/Argentina/Buenos_Aires');
	$datetime = new DateTime();
	$datetime->setTimezone($tz_object);
	return $datetime->format('Y-m-d\TH:i:s.u');
}

function cambiar_formato($fecha,$b){
	$datetime = new DateTime($fecha);
	if($b){
		return $datetime->format('d/m/Y');
	}
	else{
		return $datetime->format('H:i d/m/Y');
	}
}

function edad($fecha){
	$array=explode("-",$fecha);
	$year=$array[0];
	$month=$array[1];
	$day=$array[2];
	$year_diff=date("Y")-$year;
	$month_diff=date("m")-$month;
	$day_diff=date("d")-$day;
	if($day_diff<0&&$month_diff==0){
		$year_diff--;
	}
	if($day_diff<0&&$month_diff<0){
		$year_diff--;
	}
	return $year_diff;
}

////////////////VALIDACIONES


