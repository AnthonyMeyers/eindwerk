<?php

namespace App\Controller\Admin;

use App\Entity\Contact;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TelephoneField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class ContactCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Contact::class;
    }


    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            TextField::new('cntName'),
            TelephoneField::new('cntTel'),
            TextField::new('cntstreet'),
            TextField::new('cntPostal'),
            TextField::new('cntCity'),
            TextField::new('cntMail'),
            AssociationField::new('cntUser'),
        ];
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
