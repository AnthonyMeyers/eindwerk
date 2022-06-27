<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    /**
     * @Route("/*", name="app_unknown")
     * rerouts if the route is not in use
     */
    public function show()
    {

        return $this->render("bundles/TwigBundle/error404.html.twig");
    }
}