<?php
require_once 'models/TaskModel.php';

class TaskController
{
    public function getTask($email)
    {
        $taskModel = new TaskModel();
        $tasks = $taskModel->getTask($email);

        echo json_encode($tasks);
    }

    public function addTask($input)
    {
        $taskModel = new TaskModel();
        $id = $taskModel->addTask($input);
        if ($id) {
            echo json_encode(['status' => 'success', 'message' => 'Uspešno dodano opravilo', 'id' => $id]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Napaka']);
        }
    }
    public function deleteTask($id)
    {
        $taskModel = new TaskModel();
        if ($taskModel->deleteTask($id)) {
            echo json_encode(['status' => 'success', 'message' => 'Uspešno izbrisano opravilo']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Napaka']);
        }
    }
    public function checkTask($id)
    {
        $taskModel = new TaskModel();
        $id = $taskModel->checkTask($id);
        if ($id) {
            echo json_encode(['status' => 'success', 'message' => 'Uspešno posodoboljeno opravilo']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Napaka']);
        }
    }
}
