<?php
require_once 'models/UserModel.php';

class LoginController
{
    public function login($data)
    {
        $userModel = new UserModel();
        $email = $data['email'];
        $password = $data['password'];

        if ($userModel->verifyUser($email, $password)) {
            echo json_encode(['status' => 'success', 'message' => 'Prijava uspešna']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Napačni email ali geslo']);
        }
    }
}
