<?php

	// example use from browser
	// http://localhost/companydirectory/libs/php/insertDepartment.php?name=New%20Department&locationID=1

	// remove next two lines for production
	
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	include(__DIR__ . "/config.php");
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

	// $_REQUEST used for development / debugging. Remember to cange to $_POST for production

	$firstName = isset($_REQUEST['firstName']) ? urldecode($_REQUEST['firstName']) : "";
	$lastName = isset($_REQUEST['lastName']) ? urldecode($_REQUEST['lastName']) : "";
	$jobTitle = isset($_REQUEST['jobTitle']) ? urldecode($_REQUEST['jobTitle']) : "";
	$phoneNumber = isset($_REQUEST['phoneNumber']) ? urldecode($_REQUEST['phoneNumber']) : "";
	$email = isset($_REQUEST['email']) ? urldecode($_REQUEST['email']) : "";
	$departmentID = $_REQUEST['departmentID'] != "" ? urldecode($_REQUEST['departmentID']) : 1;

	$query = "INSERT INTO personnel (firstName, lastName, jobTitle, email, phoneNumber, departmentID) VALUES (
		'$firstName',
		'$lastName',
		'$jobTitle',
		'$email',
		'$phoneNumber',
		$departmentID
	)";	

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

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = [];
	
	$conn->close();

	echo json_encode($output); 

?>