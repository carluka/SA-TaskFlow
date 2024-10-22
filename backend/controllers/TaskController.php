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
}
