<?php
require_once 'models/CategorieModel.php';

class CategorieController
{
    public function getCategories()
    {
        $categorieModel = new CategorieModel();
        $categories = $categorieModel->getCategories();
        echo json_encode($categories);
    }
}
