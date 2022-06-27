<?php

namespace App\Controller\Admin;

use App\Entity\Contact;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\EmailField;
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
            TextField::new('cntName', 'Name')
                ->setFormTypeOptions(['attr' =>['minlength' => "4", "maxlength" => "22","pattern"=>"[A-Za-z\s.ç'_,]+"]])
                ->setHelp("Min 4 standard characters"),
            TextField::new('cntstreet', 'Street')->hideOnIndex()
                ->setFormTypeOptions(['attr' =>['minlength' => "7", "maxlength" => "40","pattern"=>"[A-Za-z0-9\s.']+"]])
                ->setHelp("Min 7 standard characters"),
            TextField::new('cntPostal', 'Postal')->hideOnIndex()
                ->setFormTypeOptions(['attr' =>['minlength' => "5", "maxlength" => "10","pattern"=>"[A-Za-z0-9\s]+"]])
                ->setHelp("Min 5 standard characters"),
            TextField::new('cntCity', 'City')->hideOnIndex()
                ->setFormTypeOptions(['attr' =>['minlength' => "4", "maxlength" => "22","pattern"=>"[A-Za-z\s.ç'_,]+"]])
                ->setHelp("Min 4 standard characters"),
            TelephoneField::new('cntTel', 'Tel. number')->hideOnIndex()
                ->setFormTypeOptions(['attr' =>['minlength' => "9", "maxlength" => "15"]])
                ->setHelp("Min 9 standard characters"),
            EmailField::new('cntMail', 'Mail')
                ->setHelp("Correct format please 'example@user.com'"),
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
