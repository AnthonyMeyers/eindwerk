<?php

namespace App\Controller\Admin;


use App\Entity\Appointment;
use App\Entity\Contact;
use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Provider\AdminContextProvider;

class AppointmentCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Appointment::class;
    }

    //Stelt de appointmentfields in voor de appointment tab
    //RenderAsNativeAsNativeWidget() laat het associationfield zien als een standaard select
    //met vaste opties.
    public function configureFields(string $pageName): iterable
    {

        return [
            IdField::new('id')->hideOnForm(),
            TextField::new('apmTitle', 'Title')
                ->setFormTypeOptions(['attr' =>['minlength' => "4", "maxlength" => "22","pattern"=>"[A-Za-z\s_.']+"]])
                ->setHelp("Min 4 standard characters"),
            AssociationField::new('apmUsr', 'User')
                ->setRequired(true)->renderAsNativeWidget(),
            AssociationField::new('apmCnt', 'Contact'),
            DateTimeField::new('apmStartsat','Starts at'),
            DateTimeField::new('apmStopsat', 'Stops at'),
            DateTimeField::new('apmCreatedat', 'Created')->hideOnForm(),
            DateTimeField::new('apmUpdatedat','Last updated by user')->hideOnForm(),

        ];
    }
}
