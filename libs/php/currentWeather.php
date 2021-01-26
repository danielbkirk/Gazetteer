<?php

	$executionStartTime = microtime(true) / 1000;

	$url='https://api.openweathermap.org/data/2.5/weather?q=' . $_REQUEST['capital'] . '&appid=7471ded9af3a17bb4ec562424a851691';
	
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);	

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "mission saved";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['weather'] = $decode['weather'];
	$output['main'] = $decode['main'];
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 
	
?>