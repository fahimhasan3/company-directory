<?php

	// remove next two lines for production
	
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	include("config.php");
	include("DatabaseConnection.php");

	header('Content-Type: application/json; charset=UTF-8');

	$conn = new DatabaseConnection();

	if (!$conn->isConnected()) {
		
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];

		$conn->close();

		echo json_encode($output);

		exit;

	}	
	$nameFilter = isset($_REQUEST['name']) && $_REQUEST['name'] != "" ? urldecode($_REQUEST['name']) : null;
	
	$query = 'SELECT id, name FROM location';

	if($nameFilter != null) {
		$query = $query . " WHERE name like '%" . $nameFilter . "%'";
	}

	$query = $query .	" ORDER BY name";

	$result = $conn->query($query);
	
	if (!$result) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		$conn->close();

		echo json_encode($output); 

		exit;

	}
   
	$data = $conn->fetchAll($result);

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = $data;
	
	$conn->close();

	echo json_encode($output); 

?>