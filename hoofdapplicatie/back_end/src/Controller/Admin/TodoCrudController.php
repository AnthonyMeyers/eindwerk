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
            TextField::new('tdoTitle', 'Title'),
            BooleanField::new('tdoIsdone', 'Is done'),
            AssociationField::new('tdoUsr','Todo user'),
            AssociationField::new('tdoPty','Priority'),
            AssociationField::new('tdoCty','Category'),
            DateTimeField::new('tdoCreatedat', 'Created')->hideOnForm(),
            DateTimeField::new('tdoUpdatedat','Last updated')->hideOnForm(),
        ];
    }

}
