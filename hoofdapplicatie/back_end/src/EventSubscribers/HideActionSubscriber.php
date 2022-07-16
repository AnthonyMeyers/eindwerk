<?php
namespace App\EventSubscribers;

use App\Entity\Priority;
use App\Entity\User;
use App\Entity\Contact;
use App\Entity\Category;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Event\BeforeCrudActionEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class HideActionSubscriber implements EventSubscriberInterface
{

    private $adminContext;

    //Deze class zorgt ervoor dat de gebruiker zichzelf niet kan wissen in het admin panel
    //en blokkeert andere delete acties
    public function __construct( )
    {

    }

    public function onBeforeCrudActionEvent(BeforeCrudActionEvent $event)
    {

        if (!$event->getAdminContext()) {
            return;
        }

        $this->adminContext = $event->getAdminContext();

        if (!$this->adminContext->getCrud()) {
            return;
        }

        $this->crudDto = $this->adminContext->getCrud();

        if ($this->crudDto->getEntityFqcn() !== User::class &&
            $this->crudDto->getEntityFqcn() !== Category::class &&
            $this->crudDto->getEntityFqcn() !== Priority::class &&
            $this->crudDto->getEntityFqcn() !== Contact::class) {
            return;
        }

        $actions = $this->crudDto->getActionsConfig()->getActions();

        if (!$deleteAction = $actions[Action::DELETE] ?? null) {
            return;
        }

        //Zorgt ervoor dat de eerste categorieklasse niet verwijderd kan worden
        if($this->crudDto->getEntityFqcn() === Category::class) {

            $deleteAction->setDisplayCallable(function(Category $category) {
                return $category->getId() !== 1 && $category->getTodos()->count() === 0;
            });

        }

        //Zorgt ervoor dat de eerste prioriteit niet verwijderd kan worden
        if($this->crudDto->getEntityFqcn() === Priority::class) {

            $deleteAction->setDisplayCallable(function(Priority $priority) {
                return $priority->getId() !== 1 && $priority->getTodos()->count() === 0;
            });
        }

        //Zorgt ervoor dat de eerste categorieklasse niet verwijderd kan worden
        if($this->crudDto->getEntityFqcn() === Contact::class) {

            $deleteAction->setDisplayCallable(function(Contact $contact) {
                return $contact->getAppointments()->count() === 0;
            });

        }

        //Zorgt ervoor dat de huidige gebruiker niet verwijderd kan worden
        if($this->crudDto->getEntityFqcn() === User::class) {

            //Zorgt ervoor dat een user zichzelf niet kan verwijderen
            if ($this->adminContext->getUser() != null){

                $deleteAction->setDisplayCallable(function (User $user) {
                    return $user->getId() !== $this->adminContext->getUser()->getId();

                });
            }
        }

    }

    public static function getSubscribedEvents()
    {
        return [
            BeforeCrudActionEvent::class => 'onBeforeCrudActionEvent',
        ];
    }

}