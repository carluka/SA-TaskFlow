<?php

require_once __DIR__ . '/../services/Database.php';

class TaskModel
{
    private $db;

    public function __construct()
    {
        $dbConnect = new DbConnect();
        $this->db = $dbConnect->connect();
    }

    public function getTask($email)
    {
        try {
            $query = "SELECT id FROM uporabnik WHERE email = :email";
            $stmt = $this->db->prepare($query);
            $stmt->execute(['email' => $email]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user) {
                $query = "SELECT * FROM opravilo WHERE uporabnik = :uporabnik";
                $stmt = $this->db->prepare($query);
                $stmt->execute(['uporabnik' => $user['id']]);

                $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

                return $tasks;
            } else {
                return [];
            }
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }
}
