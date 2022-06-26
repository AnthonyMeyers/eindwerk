<?php

namespace App\Controller\Admin;

use App\Entity\Todo;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class TodoCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Todo::class;
    }

    //Stelt de todofields in voor de todotab
    //Zet alle associationfields op renderAsNativeWidget(), zo kunnen deze niet blanco worden gelaten
    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            TextField::new('tdoTitle', 'Title'),
            BooleanField::new('tdoIsdone', 'Is done'),
            AssociationField::new('tdoUsr','Todo user')
                ->setRequired(true)->renderAsNativeWidget(),
            AssociationField::new('tdoPty','Priority')
                ->setRequired(true)->renderAsNativeWidget(),
            AssociationField::new('tdoCty','Category')
                ->setRequired(true)->renderAsNativeWidget(),
            DateTimeField::new('tdoCreatedat', 'Created')->hideOnForm(),
            DateTimeField::new('tdoUpdatedat','Last updated by user')->hideOnForm(),
        ];
    }

}
