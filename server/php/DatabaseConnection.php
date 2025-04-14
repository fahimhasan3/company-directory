<?php

include(__DIR__ . "/config.php");

class DatabaseConnection {
    private $conn = null;

    public function __construct() {
        // Use config directly inside the class
        global $db_host, $db_user, $db_password, $db_name, $db_port, $db_socket, $db_connection_mode;

        if ($db_connection_mode == 'mysql') {
            $this->conn = new mysqli($db_host, $db_user, $db_password, $db_name, $db_port, $db_socket);
        } else {
            $connectionString = "host=$db_host port=$db_port dbname=$db_name user=$db_user password=$db_password";
            $this->conn = pg_connect($connectionString);
        }
    }

    public function isConnected() {
        if ($this->conn instanceof mysqli) {
            return !$this->conn->connect_error;
        } else {
            return $this->conn !== false;
        }
    }

    public function getConnection() {
        return $this->conn;
    }

    public function query($sql) {
        if ($this->conn instanceof mysqli) {
            return $this->conn->query($sql);
        } else {
            return pg_query($this->conn, $sql);
        }
    }

    public function fetchAll($result) {
        $rows = [];
        if ($this->conn instanceof mysqli) {
            while ($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
        } else {
            while ($row = pg_fetch_assoc($result)) {
                $rows[] = $row;
            }
        }
        return $rows;
    }

    public function close() {
        if ($this->conn instanceof mysqli) {
            $this->conn->close();
        } else {
            pg_close($this->conn);
        }
    }
}

?>
