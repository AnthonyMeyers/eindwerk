<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TestController extends AbstractController
{

    /**
     * @Route("/test", name="app_test")
     */
    public function test()
    {
        $uri = 'http://localhost:8001/api/login';
        $method = 'POST';
        $paramaters = array(
            'username' => 'blazblue',
            'password' => 'admin123',

        );
        $request = new Request();
        $request->create($uri,$method,$paramaters);


        return new Response("Message to user") ;
    }
}