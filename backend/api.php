<?php
require_once __DIR__ . '/services/Database.php';

$database = new DbConnect();
$db = $database->connect();

$query = $db->query("SELECT * FROM uporabnik");
$results = $query->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($results);
