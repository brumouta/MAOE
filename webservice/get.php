<?php
include ("conn.php");
include ("library.php");

if (isset($_POST['fb_id'])) {
	$fb_id = $_POST['fb_id'];

	echo json_encode(get($fb_id));
}