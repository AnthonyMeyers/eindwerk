<?php

namespace App\Controller;


use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Email;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use SymfonyCasts\Bundle\VerifyEmail\VerifyEmailHelperInterface;

class MailerController extends AbstractController
{

    /**
     * @Route("/emailsymfony")
     */
    public function sendEmail(MailerInterface $mailer): Response
    {
        $email = (new Email())
        ->to('thony.meyers@gmail.com')
        //->cc("cc@example.com")
        //->bcc("bcc@example.com")
        //replyTo("test@example.com")
        //->priority(Email::PRIORITY_HIGH)
        ->subject("Time for Symfony Mailer")
            ->text("Sending emails is fun again!")
            ->html('<p>See Twig integration for better HTML integration!</p>');

        $mailer->send($email);

        return new Response("Testmail verzonden!");
    }

    /**
     * @Route("/tempmail",name="app_registration_success", methods={"GET","HEAD"})
     */
    public function templateEmail(MailerInterface $mailer): Response
    {
        $email = (new TemplatedEmail())
            ->to(new Address('thony.meyers@gmail.com'))
            ->subject('Thanks for signing up!')

        //path of the Twig template to render
        ->htmlTemplate('emails/register.html.twig')

        //pass variables(name=>value) to the template
        ->context(["expiration_date" => new \Datetime('+7 days'),
        "username" => "test"]);

        $mailer->send($email);

        return new Response("Template Mail verzonden");
    }

}