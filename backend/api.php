<?php
require_once __DIR__ . '/services/Database.php';
require_once __DIR__ . '/controllers/LoginController.php';
require_once __DIR__ . '/controllers/RegistrationController.php';
require_once __DIR__ . '/controllers/TaskController.php';
require_once __DIR__ . '/controllers/CategorieController.php';

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
    case 'addTask':
        if ($request_method === 'POST') {
            $input = json_decode(file_get_contents('php://input'), true);
            $taskController = new TaskController();
            $taskController->addTask($input);
        } else {
            echo json_encode(['message' => 'Invalid request method']);
        }
        break;
    case 'deleteTask':
        if ($request_method === 'DELETE') {
            $input = json_decode(file_get_contents('php://input'), true);
            log_data($input['id']);
            if (isset($input['id'])) {
                $taskController = new TaskController();
                $taskController->deleteTask($input['id']);
                echo json_encode(['status' => 'success', 'message' => 'Task deleted successfully']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Task ID is missing']);
            }
        } else {
            echo json_encode(['message' => 'Invalid request method']);
        }
        break;
    case 'checkTask':
        if ($request_method === 'PUT') {
            $input = json_decode(file_get_contents('php://input'), true);
            log_data($input);
            if (isset($input)) {
                $taskController = new TaskController();
                $taskController->checkTask($input);
                echo json_encode(['status' => 'success', 'message' => 'Opravilo uspešno posodobljeno']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Task ID is missing']);
            }
        } else {
            echo json_encode(['message' => 'Invalid request method']);
        }
        break;
    case 'getCategories':
        if ($request_method === 'GET') {
            $categorieController = new CategorieController();
            $categorieController->getCategories();
        } else {
            echo json_encode(['message' => 'Invalid request method']);
        }
        break;
    default:
        echo json_encode(['message' => 'Invalid endpoint']);
        break;
}
