<?php
function add ($fb_id, $lat, $lng, $image = null) {
	if (file_exists($image)) {
		$image_content = file_get_contents($image);
		$image_content = base64_encode($image_content);

	} else {
		$image_content = null;
	}

	
}

function getMyLocations ($fb_id) {
	$query = mysql_query ("SELECT * FROM locations WHERE fb_id = $fb_id;");

	if ($query) {
		$data = array();
		while($row = mysql_fetch_assoc($query)) {
			$data[] = $row;
		}
	}

	return $data;
}