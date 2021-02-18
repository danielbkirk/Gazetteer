<?php
$executionStartTime = microtime(true) / 1000;

$border = file_get_contents('libs/js/countryBorders.geo.json');

$decode = json_decode($border, true);

foreach ($decode->features as $data) {
	if ($data->properties->iso_a2 == "GB"){
		$output['status']['code'] = "200";
		$output['status']['name'] = "ok";
		$output['status']['description'] = "mission saved";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['coordinates'] = $decode['geometry']['coordinates'];

		header('Content-Type: application/json; charset=UTF-8');

		echo json_encode($output);
	}
};

?>
