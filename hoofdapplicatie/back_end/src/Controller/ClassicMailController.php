<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

class ClassicMailController extends AbstractController
{

    /**
     * @Route ("/mail")
     */
    public function mailNative(): Response
    {
        $headers = "MIME3_Version: 1.0"."\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8"."\r\n";
        $headers .= "From: <sethmercurio890@gmail.com>" ."\r\n";
        $headers .= "To: <thony.meyers@gmail.com>"."\r\n";
        $headers .= "Bcc: thony.meyers@gmail.com"."\r\n";

        $to = "thony.meyers@gmail.com";
        $subject = "Native Mail Function alive!";
        $message = "<body><h1>Hello from Native Mail</h1>";

        mail($to,$subject,$message,$headers);

        return new Response("Native Mail verzonden!");

    }




}