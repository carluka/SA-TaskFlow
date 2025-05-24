<?php
class DbConnect
{
    private $server = 'mysql';
    private $dbname = 'seznamopravil';
    private $user = 'root';
    private $pass = 'root';

    public function __construct()
    {
        $this->server = getenv('DB_HOST') ?: 'mysql';
        $this->dbname = getenv('DB_NAME') ?: 'seznamopravil';
        $this->user   = getenv('DB_USER') ?: 'root';
        $this->pass   = getenv('DB_PASS') ?: '';
    }

    public function connect()
    {
        try {
            $conn = new PDO('mysql:host=' . $this->server . ';dbname=' . $this->dbname, $this->user, $this->pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (PDOException $e) {
            echo "Povezava ni uspela:" . $e->getMessage();
        }
    }
}
