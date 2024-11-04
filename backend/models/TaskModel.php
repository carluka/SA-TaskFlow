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
                foreach ($tasks as &$task) {
                    $task['opravljeno'] = $task['opravljeno'] == 1 ? true : false;
                }
                return $tasks;
            } else {
                return [];
            }
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }

    public function addTask($input)
    {
        try {
            $query = "SELECT id FROM uporabnik WHERE email = :email";
            $stmt = $this->db->prepare($query);
            $stmt->execute(['email' => $input['uporabnik']]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user) {

                $insertQuery = "INSERT INTO opravilo (naziv, opis, rok, uporabnik, kategorija, opravljeno) VALUES (:naziv, :opis, :rok, :uporabnik, :kategorija, :opravljeno)";
                $stmt = $this->db->prepare($insertQuery);
                $result = $stmt->execute([
                    'naziv' => $input['naziv'],
                    'opis' => $input['opis'],
                    'rok' => $input['rok'],
                    'uporabnik' => $user['id'],
                    'kategorija' => $input['kategorija'],
                    'opravljeno' => $input['opravljeno'],
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
    public function deleteTask($id)
    {
        try {
            $query = "DELETE FROM opravilo WHERE id = :id";
            $stmt = $this->db->prepare($query);
            $stmt->execute(['id' => $id]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($result) {
                return true;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }
    public function checkTask($id)
    {
        try {
            $query = "UPDATE opravilo SET opravljeno = CASE WHEN opravljeno = 1 THEN 0 ELSE 1 END WHERE id = :id";
            $stmt = $this->db->prepare($query);
            $stmt->execute(['id' => $id]);
            if ($stmt->rowCount() > 0) {
                return true;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }
    public function editTask($input)
    {
        try {
            $query = "SELECT id FROM uporabnik WHERE email = :email";
            $stmt = $this->db->prepare($query);
            $stmt->execute(['email' => $input['uporabnik']]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user) {
                $updateQuery = "UPDATE opravilo SET 
                naziv = :naziv, 
                opis = :opis, 
                rok = :rok, 
                uporabnik = :uporabnik, 
                kategorija = :kategorija, 
                opravljeno = :opravljeno 
                WHERE id = :id";

                $stmt = $this->db->prepare($updateQuery);
                $result = $stmt->execute([
                    'naziv' => $input['naziv'],
                    'opis' => $input['opis'],
                    'rok' => $input['rok'],
                    'uporabnik' => $user['id'],
                    'kategorija' => $input['kategorija'],
                    'opravljeno' => $input['opravljeno'],
                    'id' => $input['id']
                ]);

                if ($result) {
                    return true;
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
