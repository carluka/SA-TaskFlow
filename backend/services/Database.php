<?php
class DbConnect
{
    private $server = 'localhost';
    private $dbname = 'seznamopravil';
    private $user = 'root';
    private $pass = '';

    public function connect()
    {
        try {
            $conn = new PDO('mysql:host=' . $this->server . ';dbname=' . $this->dbname, $this->user, $this->pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            echo "Povezava uspesna";
            return $conn;
        } catch (PDOException $e) {
            echo "Povezava ni uspela:" . $e->getMessage();
        }
    }
}
