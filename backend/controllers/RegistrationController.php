<?php
require_once 'models/UserModel.php';
require __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

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
            $this->sendConfirmationEmail($ime, $priimek, $email);
            echo json_encode(['status' => 'success', 'message' => 'Registracija uspešna']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Uporabnik že obstaja']);
        }
    }

    private function sendConfirmationEmail($ime, $priimek, $email)
    {
        $mail = new PHPMailer(true);

        try {
            $mail->SMTPDebug = 3;
            $mail->Debugoutput = function ($str, $level) {
                file_put_contents('phpmailer_debug.log', "Debug level [$level]: $str" . PHP_EOL, FILE_APPEND);
            };


            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'carluka33@gmail.com';
            $mail->Password = 'brej zodn aniw odln';
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;
            $mail->CharSet = 'UTF-8';
            $mail->SMTPOptions = [
                'ssl' => [
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                    'allow_self_signed' => true,
                ],
            ];

            $mail->setFrom('seznamOpravil@so.si', 'Seznam Opravil');
            $mail->addAddress($email, "$ime $priimek");

            $mail->isHTML(true);
            $mail->Subject = 'Uspešna registracija';
            $mail->Body = "
                <p>Spoštovani $ime $priimek,</p>
                <p>Vaša registracija v aplikacijo <strong>Seznam Opravil</strong> je bila uspešna.</p>
                <p>Za dostop do aplikacije uporabite svoj e-poštni naslov in geslo, ki ste ga določili ob registraciji.</p>
                <p>Če imate kakršna koli vprašanja ali potrebujete pomoč, nas lahko kontaktirate na <a href='mailto:support@so.si'>support@so.si</a>.</p>
                <p>Hvala, ker ste se pridružili naši skupnosti!</p>

            ";
            $mail->AltBody = "$ime $priimek, Uspešna registracija";

            $mail->send();
        } catch (Exception $e) {
        }
    }
}
