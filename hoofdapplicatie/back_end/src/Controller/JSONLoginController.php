<?php

namespace App\Controller;


use ApiPlatform\Core\Api\IriConverterInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class JSONLoginController extends AbstractController
{

    /**
     * @Route("/api/login", name="app_json_login", methods={"POST"})
     */
    public function login(IriConverterInterface $iriConverter)
    {


        if (!$this->isGranted('IS_AUTHENTICATED_FULLY')) {
            return $this->json([
                'error' => 'Invalid login request: check that the Content-Type header is "application/json".'
            ], 400);
        }

        return new Response("", 204, ["location" => $iriConverter->getIriFromItem($this->getUser())]);
    }

    /**
     * @Route("/api/logout", name="app_json_logout")
     */
    public function logout()
    {
        throw new \Exception('should not be reached');

    }

}