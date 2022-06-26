<?php

namespace App\Controller\Admin;

use App\Entity\Category;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class CategoryCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Category::class;
    }
    //Stelt de categoryfields in voor de categorietab
    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            TextField::new('ctyTitle','Title'),
            TextField::new('ctyClass','CSS class'),
            BooleanField::new('ctyIsclassavailable', 'Is active'),
        ];
    }

    //Zet de batch delete optie af
    public function configureActions(Actions $actions): Actions
    {
        return parent::configureActions($actions)->disable(Action::BATCH_DELETE);
    }
}
