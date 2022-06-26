<?php

namespace App\Controller\Admin;

use App\Entity\Priority;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class PriorityCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Priority::class;
    }

    //Stelt de priorityfields in voor de prioritytab
    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            NumberField::new('ptyRating','Urgency'),
            TextField::new('ptyTitle','Title'),
        ];
    }

    //Zet de batch delete optie af
    public function configureActions(Actions $actions): Actions
    {
        return parent::configureActions($actions)->disable(Action::BATCH_DELETE);
    }

}
