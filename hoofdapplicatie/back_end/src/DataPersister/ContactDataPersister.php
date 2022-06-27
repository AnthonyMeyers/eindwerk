<?php

namespace App\DataPersister;

use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use App\Entity\Contact;
use Doctrine\ORM\EntityManagerInterface;

class ContactDataPersister implements DataPersisterInterface
{

    private $entityManager;

    //Custom error om bij delete van contact met appointments
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /*
     *      * @param Contact $data
     */
    public function supports($data): bool
    {
        // TODO: Implement supports() method.
        return $data instanceof Contact;
    }

    public function persist($data)
    {
        // TODO: Implement persist() method.
        $this->entityManager->persist($data);
        $this->entityManager->flush();
    }

    public function remove($data)
    {

        if($data->getAppointments()->count()){
            throw new \Doctrine\DBAL\Exception("This contact has appointments.");
        }

        $this->entityManager->remove($data);
        $this->entityManager->flush();
    }
}