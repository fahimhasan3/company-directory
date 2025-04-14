<?php
    include("../DatabaseConnection.php");

    $executionStartTime = microtime(true);
    $conn = new DatabaseConnection();

	if (!$conn->isConnected()) {
        echo "Description: database unavailable\n";
        echo "Returned In: " . (microtime(true) - $executionStartTime) / 1000 . " ms\n";

        $conn->close();
        exit;
    }

    echo "Description: database connection successful\n";
    echo "Returned In: " . (microtime(true) - $executionStartTime) / 1000 . " ms\n";
    $conn->close();
?>