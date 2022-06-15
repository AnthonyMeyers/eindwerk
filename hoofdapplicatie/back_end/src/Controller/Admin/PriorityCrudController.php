<?php

namespace App\Controller\Admin;

use App\Entity\Priority;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class PriorityCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Priority::class;
    }

    /*
    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id'),
            TextField::new('title'),
            TextEditorField::new('description'),
        ];
    }
    */
}
