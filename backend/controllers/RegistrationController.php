<?php
require_once 'models/UserModel.php';

class RegistrationController
{
    public function register($data)
    {
        $userModel = new UserModel();
        $ime = $data['ime'];
        $priimek = $data['priimek'];
        $email = $data['email'];
        $geslo = $data['geslo'];
        $obvescanje = isset($data['obvescanje']) ? $data['obvescanje'] : 1;

        if ($userModel->registerUser($ime, $priimek, $email, $geslo, $obvescanje)) {
            echo json_encode(['status' => 'success', 'message' => 'Registracija uspešna']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Uporabnik že obstaja']);
        }
    }
}
