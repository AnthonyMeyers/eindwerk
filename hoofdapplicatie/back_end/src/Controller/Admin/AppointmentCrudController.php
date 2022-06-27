<?php

namespace App\Controller\Admin;

use App\Entity\Appointment;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

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
,
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
