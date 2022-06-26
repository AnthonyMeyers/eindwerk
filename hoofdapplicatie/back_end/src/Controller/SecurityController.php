<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
    /**
     * @Route("/", name="app_login")
     * Zorgt voor het login formulier bij start van de website
     */
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('security/login.html.twig', ['last_username' => $lastUsername, 'error' => $error]);
    }

    /**
     * @Route("/checklogin",name="check_login_form")
     * Login form wijst door naar hier, hier wordt nagekeken of de gebruiker een admin role heeft
     * Zo niet, wordt de gebruiker direct doorverwezen naar logout
     */
    public function logincheck()
    {
        if($this->isGranted("ROLE_ADMIN"))
        {
            return $this->redirectToRoute("app_admin_page");
        }
        return $this->redirectToRoute("app_logout");
    }



    /**
     * @Route("/logout", name="app_logout")
     * Logt de gebruiker uit en keert terug naar login
     */
    public function logout()
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }
}
