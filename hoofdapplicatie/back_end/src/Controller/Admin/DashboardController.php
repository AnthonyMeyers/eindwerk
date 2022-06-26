<?php

namespace App\Controller\Admin;

use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use EasyCorp\Bundle\EasyAdminBundle\Config\Assets;

class DashboardController extends AbstractDashboardController
{
    /**
     * @Route("/admin", name="app_admin_page")
     */
    public function index(): Response
    {
        // ga naar een bepaalde crud controller
        $routeBuilder = $this->get(AdminUrlGenerator::class);

        return $this->render('bundles/EasyAdminBundle/layout.html.twig',);
    }

    //Past bepaalde layout aan in het dashboard
    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('The TDL Application admin');
    }

    public function configureAssets(): Assets
    {
        return parent::configureAssets()->addCssFile('css/dashboard.css');
    }

    //Zorgt voor de menuitems die linken naar de controllers.
    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('Dashboard', 'fa fa-home');
        yield MenuItem::linkToCrud('Categories','fa fa-tablet',CategoryCrudController::getEntityFqcn());
        yield MenuItem::linkToCrud('Priorities','fa  fa-binoculars',PriorityCrudController::getEntityFqcn());
        yield MenuItem::linkToCrud('Contacts','fa  fa-handshake-o',ContactCrudController::getEntityFqcn());
        yield MenuItem::linkToCrud('Appointments','fa fa-pencil-square-o',AppointmentCrudController::getEntityFqcn());
        yield MenuItem::linkToCrud('Todos','fa fa-list-ul',TodoCrudController::getEntityFqcn());
        yield MenuItem::linkToCrud('Users','fa fa-users',UserCrudController::getEntityFqcn());
        Yield MenuItem::linkToUrl("To the TDL Application","fa fa-briefcase","https://eindwerk-one.vercel.app/");
    }
}
