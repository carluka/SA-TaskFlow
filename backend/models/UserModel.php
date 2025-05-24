<?php
require_once __DIR__ . '/../services/Database.php';

class UserModel
{
    private $db;

    public function __construct()
    {
        $dbConnect = new DbConnect();
        $this->db = $dbConnect->connect();
    }

    public function verifyUser($email, $password)
    {
        try {
            $query = "SELECT geslo FROM uporabnik WHERE email = :email";
            $stmt = $this->db->prepare($query);
            $stmt->execute(['email' => $email]);

            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user && password_verify($password, $user['geslo'])) {
                return true;
            }

            return false;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }

    public function registerUser($ime, $priimek, $email, $geslo, $obvescanje)
    {
        try {
            $checkQuery = "SELECT * FROM uporabnik WHERE email = :email";
            $stmt = $this->db->prepare($checkQuery);
            $stmt->execute(['email' => $email]);

            if ($stmt->rowCount() > 0) {
                return false;
            }

            $hashedPassword = password_hash($geslo, PASSWORD_DEFAULT);

            $insertQuery = "INSERT INTO uporabnik (ime, priimek, email, geslo, obvescanje) VALUES (:ime, :priimek, :email, :geslo, :obvescanje)";
            $stmt = $this->db->prepare($insertQuery);
            return $stmt->execute([
                'ime' => $ime,
                'priimek' => $priimek,
                'email' => $email,
                'geslo' => $hashedPassword,
                'obvescanje' => $obvescanje
            ]);
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }
}
