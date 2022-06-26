<?php

namespace App\EventSubscribers;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\User;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Mailer\MailerInterface;

class RegistrationSubscriber implements EventSubscriberInterface
{

    private $mailer;


    public function __construct(MailerInterface $mailer)
    {

        $this->mailer = $mailer;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => [
                ['sendRegistrationMail', EventPriorities::POST_WRITE],
                ['sendRemoveAccountMail', EventPriorities::PRE_WRITE]]
        ];
    }

    //Stuurt een welkommail naar de gebruiker die zich net heeft geregistreerd
    public function sendRegistrationMail(ViewEvent $event): void
    {

        $user = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$user instanceof User || Request::METHOD_POST !== $method) {
            return;
        }

        $message = (new TemplatedEmail())
            ->to($user->getUsrmail())
            ->subject('Welcome to the TDL Application')
            ->htmlTemplate('emails/register.html.twig')
            ->context(["username"=>$user->getUsername(),"emailaddress" => $user->getUsrMail()]);

        $this->mailer->send($message);
    }

    //Bevestigd het verwijderen van de account
    public function sendRemoveAccountMail(ViewEvent $event): void
    {
        $user = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$user instanceof User || Request::METHOD_DELETE !== $method) {
            return;
        }

        $message = (new TemplatedEmail())
            ->to($user->getUsrmail())
            ->subject('Goodbye')
            ->htmlTemplate('emails/removeuser.html.twig')
            ->context(["username"=>$user->getUsername(),"emailaddress" => $user->getUsrMail()]);

        $this->mailer->send($message);
    }

}