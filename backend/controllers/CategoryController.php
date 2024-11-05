<?php
require_once 'models/CategoryModel.php';

class CategoryController
{
    public function getCategories($email)
    {
        $categoryModel = new CategoryModel();
        $categories = $categoryModel->getCategories($email);
        echo json_encode($categories);
    }
    public function addCategory($input)
    {
        $categoryModel = new CategoryModel();
        $id = $categoryModel->addCategory($input);
        if ($id) {
            echo json_encode(['status' => 'success', 'message' => 'Uspešno dodana kategorija', 'id' => $id]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Napaka']);
        }
    }
}
