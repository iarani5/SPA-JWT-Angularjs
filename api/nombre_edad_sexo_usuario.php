<?php
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

$db = new PDO('mysql:host=localhost;dbname=confesiones;charset=utf8', 'root', '');
$query = "SELECT USUARIO, FECHA_NACIMIENTO, FKSEXO FROM usuario WHERE ID = :id";
$stmt = $db->prepare($query);
$stmt->execute([':id' => $_GET['id']]);
$res=$stmt->fetch(PDO::FETCH_ASSOC);
$res['FECHA_NACIMIENTO']=edad($res['FECHA_NACIMIENTO']);
$res=json_encode($res);
$res = substr($res, 0, -1);
$res=$res.',"FKUSUARIO":"'.$_GET['id'].'"}';
echo $res;