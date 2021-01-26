<?php

	$executionStartTime = microtime(true) / 1000;

	$url='https://newsapi.org/v2/top-headlines?country='. $_REQUEST['countryCode'] .'&apiKey=dbc8776e189f4a9f9c056f5019f88290';
	
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
	$output['article'] = $decode['articles'];
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 
	
?>