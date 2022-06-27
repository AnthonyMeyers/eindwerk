<?php

namespace App\DataProvider;

use ApiPlatform\Core\DataProvider\ItemDataProviderInterface;
use ApiPlatform\Core\DataProvider\RestrictedDataProviderInterface;
Use App\Entity\Contact;
use App\Repository\ContactRepository;
use ApiPlatform\Core\DataProvider\SerializerAwareDataProviderInterface;
use ApiPlatform\Core\DataProvider\SerializerAwareDataProviderTrait;

final class ContactItemDataProvider implements ItemDataProviderInterface, RestrictedDataProviderInterface, SerializerAwareDataProviderInterface
{

    use SerializerAwareDataProviderTrait;
    private $repository;

    //Geeft de contactpersoon terug of een lege array
    public function __construct(ContactRepository $repository)
    {
        $this->repository = $repository;
    }

    public function supports(string $resourceClass, string $operationName = null, array $context = []): bool
    {
        // TODO: Implement supports() method.
        return Contact::class === $resourceClass;
    }

    public function getItem(string $resourceClass, $id, string $operationName = null, array $context = [])
    {
        // TODO: Implement getItem() method.
        $data = $this->repository->findOneBy(['id' => $id]);

        if($id === 0)
        {
            return [] ;
        }

        return $data;


    }
}