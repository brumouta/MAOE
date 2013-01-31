<?php
$lat = $_POST['lat'];
$lng = $_POST['lng'];

if (!isset($_POST['lat']) || !isset($_POST['lng'])) {
	$erro = array("Erro"=>"A latitude ou longitude não foram informadas");
	echo json_encode($erro);
	exit();
}

if (!isset($_POST['fb_id'])) {
	$erro = array("Erro"=>"VocÊ não está conectado com o facebook");
	echo json_encode($erro);
	exit();

}

include ("conn.php");
include ("library.php")