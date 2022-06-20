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
            TextField::new('cntName', 'Name'),
            TextField::new('cntstreet', 'Street')->hideOnIndex(),
            TextField::new('cntPostal', 'Postal')->hideOnIndex(),
            TextField::new('cntCity', 'City')->hideOnIndex(),
            TelephoneField::new('cntTel', 'Tel. number')->hideOnIndex(),
            TextField::new('cntMail', 'Mail'),
            AssociationField::new('cntUsr','Contact'),
            DateTimeField::new('cntCreatedat', 'Created')->hideOnForm(),
            DateTimeField::new('cntUpdatedat','Last updated by user')->hideOnForm(),
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
