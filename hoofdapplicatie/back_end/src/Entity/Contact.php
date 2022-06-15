<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ContactRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;

/**
 * @ApiResource(
 *     normalizationContext={"groups"={"contacts:read"}},
 *     denormalizationContext={"groups"={"contacts:write"}}))
 * @ORM\Entity(repositoryClass=ContactRepository::class)
 */
class Contact
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"user:read","contacts:read","contacts:write"})
     * @ApiFilter(SearchFilter::class, properties={"cntUser"})
     * @ApiFilter(OrderFilter::class, properties={"cntName":"ASC"})
     * @Groups({"appointments:read", "appointments:write"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=200)
     * @Groups({"user:read","contacts:read","contacts:write"})
     */
    private $cntName;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     * @Groups({"contacts:read","contacts:write"})
     */
    private $cntTel = "";

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"contacts:read","contacts:write"})
     */
    private $cntStreet = "";

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     * @Groups({"contacts:read","contacts:write"})
     */
    private $cntPostal = "";

    /**
     * @ORM\Column(type="string", length=200, nullable=true)
     * @Groups({"contacts:read","contacts:write"})
     */
    private $cntCity = "";

    /**
     * @ORM\Column(type="string", length=200, nullable=true)
     * @Groups({"contacts:read","contacts:write"})
     */
    private $cntMail = "";

    /**
     * @return string
     */
    public function getCntMail(): string
    {
        return $this->cntMail;
    }

    /**
     * @param string $cntMail
     */
    public function setCntMail(string $cntMail): void
    {
        $this->cntMail = $cntMail;
    }

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="contacts")
     * @Groups({"contacts:read","contacts:write"})
     */
    private $cntUser;

    /**
     * @ORM\OneToMany(targetEntity=Appointment::class, mappedBy="apmCnt", orphanRemoval="true")
     */
    private $appointments;

    public function __construct()
    {
        $this->contactApm = new ArrayCollection();
        $this->appointments = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function __toString()
    {
        return $this->cntName;
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

    public function getCntTel(): ?string
    {
        return $this->cntTel;
    }

    public function setCntTel(?string $cntTel): self
    {
        $this->cntTel = $cntTel;

        return $this;
    }

    public function getCntStreet(): ?string
    {
        return $this->cntStreet;
    }

    public function setCntStreet(?string $cntStreet): self
    {
        $this->cntStreet = $cntStreet;

        return $this;
    }

    public function getCntPostal(): ?string
    {
        return $this->cntPostal;
    }

    public function setCntPostal(?string $cntPostal): self
    {
        $this->cntPostal = $cntPostal;

        return $this;
    }

    public function getCntCity(): ?string
    {
        return $this->cntCity;
    }

    public function setCntCity(?string $cntCity): self
    {
        $this->cntCity = $cntCity;

        return $this;
    }

    public function getCntUser(): ?User
    {
        return $this->cntUser;
    }

    public function setCntUser(?User $cntUser): self
    {
        $this->cntUser = $cntUser;

        return $this;
    }

    /**
     * @return Collection<int, Appointment>
     */
    public function getAppointments(): Collection
    {
        return $this->appointments;
    }

    public function addAppointment(Appointment $appointment): self
    {
        if (!$this->appointments->contains($appointment)) {
            $this->appointments[] = $appointment;
            $appointment->setApmCnt($this);
        }

        return $this;
    }

    public function removeAppointment(Appointment $appointment): self
    {
        if ($this->appointments->removeElement($appointment)) {
            // set the owning side to null (unless already changed)
            if ($appointment->getApmCnt() === $this) {
                $appointment->setApmCnt(null);
            }
        }

        return $this;
    }
}
