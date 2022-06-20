<?php

namespace App\Controller\Admin;

use App\Entity\Priority;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class PriorityCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Priority::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            NumberField::new('ptyRating','Urgency'),
            TextField::new('ptyTitle','Title'),
        ];
    }

}
