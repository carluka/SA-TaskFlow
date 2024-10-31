<?php
require_once 'models/CategorieModel.php';

class CategorieController
{
    public function getCategories($email)
    {
        $categorieModel = new CategorieModel();
        $categories = $categorieModel->getCategories($email);
        echo json_encode($categories);
    }
    public function addCategory($input)
    {
        $categorieModel = new CategorieModel();
        $id = $categorieModel->addCategory($input);
        if ($id) {
            echo json_encode(['status' => 'success', 'message' => 'Uspešno dodana kategorija', 'id' => $id]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Napaka']);
        }
    }
}
