<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ContactRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=ContactRepository::class)
 */
class Contact
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $cntName;

    /**
     * @ORM\OneToMany(targetEntity=Appointment::class, mappedBy="apmCnt", orphanRemoval=false)
     */
    private $contact;

    public function __construct()
    {
        $this->contact = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCntName(): ?string
    {
        return $this->cntName;
    }

    public function setCntName(string $cntName): self
    {
        $this->cntName = $cntName;

        return $this;
    }

    /**
     * @return Collection<int, Appointment>
     */
    public function getContact(): Collection
    {
        return $this->contact;
    }

    public function addContact(Appointment $contact): self
    {
        if (!$this->contact->contains($contact)) {
            $this->contact[] = $contact;
            $contact->setApmCnt($this);
        }

        return $this;
    }

    public function removeContact(Appointment $contact): self
    {
        if ($this->contact->removeElement($contact)) {
            // set the owning side to null (unless already changed)
            if ($contact->getApmCnt() === $this) {
                $contact->setApmCnt(null);
            }
        }

        return $this;
    }
}
