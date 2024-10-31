<?php
require_once __DIR__ . '/../services/Database.php';

class CategorieModel
{
    private $db;

    public function __construct()
    {
        $dbConnect = new DbConnect();
        $this->db = $dbConnect->connect();
    }

    public function getCategories($email)
    {
        try {
            $query = "SELECT id FROM uporabnik WHERE email = :email";
            $stmt = $this->db->prepare($query);
            $stmt->execute(['email' => $email]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user) {
                $query = "SELECT * FROM kategorija WHERE uporabnik = :id";
                $stmt = $this->db->prepare($query);
                $stmt->execute(['id' => $user['id']]);
                $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return $categories;
            } else {
                return [];
            }
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }
    public function addCategory($input)
    {
        try {
            $query = "SELECT id FROM uporabnik WHERE email = :email";
            $stmt = $this->db->prepare($query);
            $stmt->execute(['email' => $input['uporabnik']]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user) {

                $insertQuery = "INSERT INTO kategorija (naziv, uporabnik) VALUES (:naziv, :uporabnik)";
                $stmt = $this->db->prepare($insertQuery);
                $result = $stmt->execute([
                    'naziv' => $input['naziv'],
                    'uporabnik' => $user['id'],
                ]);
                if ($result) {
                    return $this->db->lastInsertId();
                }
            } else {
                return false;
            }
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }
}
