<?php

namespace App\Controller\Admin;

use App\Entity\Contact;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\ArrayField;
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

    //Stelt de contactfields in voor de contacttab
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
            AssociationField::new('cntUsr','Contact of')
                ->setRequired(true)->renderAsNativeWidget(),
            DateTimeField::new('cntCreatedat', 'Created')->hideOnForm(),
            DateTimeField::new('cntUpdatedat','Last updated by user')->hideOnForm(),
        ];
    }

    //Zet de batch delete optie af
    public function configureActions(Actions $actions): Actions
    {
        return parent::configureActions($actions)->disable(Action::BATCH_DELETE);
    }
}
