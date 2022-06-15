<?php

namespace App\Controller\Admin;

use App\Entity\Todo;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class TodoCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Todo::class;
    }


    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            TextField::new('tdoTitle'),
            TextEditorField::new('tdoDescription'),
            BooleanField::new('tdoIsDone'),
            DateTimeField::new('tdoCreatedAt')->hideOnForm(),
            DateTimeField::new('tdoUpdatedAt')->hideOnForm(),
            AssociationField::new('tdoUsr'),
            AssociationField::new('tdoPty'),
            AssociationField::new('tdoCty'),
        ];
    }

}
