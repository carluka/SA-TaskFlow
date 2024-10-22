<?php
require_once __DIR__ . '/services/Database.php';
require_once __DIR__ . '/controllers/LoginController.php';
require_once __DIR__ . '/controllers/RegistrationController.php';
require_once __DIR__ . '/controllers/TaskController.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$request_method = $_SERVER['REQUEST_METHOD'];
$endpoint = isset($_GET['action']) ? $_GET['action'] : '';

switch ($endpoint) {
    case 'login':
        if ($request_method === 'POST') {
            $input = json_decode(file_get_contents('php://input'), true);
            $loginController = new LoginController();
            $loginController->login($input);
        } else {
            echo json_encode(['message' => 'Invalid request method']);
        }
        break;

    case 'register':
        if ($request_method === 'POST') {
            $input = json_decode(file_get_contents('php://input'), true);
            $registrationController = new RegistrationController();
            $registrationController->register($input);
        } else {
            echo json_encode(['message' => 'Invalid request method']);
        }
        break;

    case 'getTask':
        if ($request_method === 'GET') {
            $email = $_GET['email'];
            $taskController = new TaskController();
            $taskController->getTask($email);
        } else {
            echo json_encode(['message' => 'Invalid request method']);
        }
        break;

    default:
        echo json_encode(['message' => 'Invalid endpoint']);
        break;
}
