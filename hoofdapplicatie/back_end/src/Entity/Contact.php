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
    *  @ApiResource(
    *   collectionOperations={
    *     "get" = {"access_control" = "is_granted('ROLE_USER')"},
    *     "post" = {"access_control" = "is_granted('ROLE_USER')"}},
    *
    *  itemOperations={
    *     "get" = {"access_control" = "is_granted('ROLE_USER')"},
    *     "patch"  = {"access_control" = "is_granted('ROLE_USER')"},
    *     "put" = {"access_control" = "is_granted('ROLE_USER')"},
    *     "delete"  = {"access_control" = "is_granted('ROLE_USER')"}},
    *
    *   normalizationContext={"groups"={"contacts:read"}},
    *   denormalizationContext={"groups"={"contacts:write"}}))
    *
    *      @ORM\Entity(repositoryClass=ContactRepository::class)
*/
class Contact
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"user:read","contacts:read","contacts:write"})
     * @ApiFilter(SearchFilter::class, properties={"cntUsr"})
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
    private $cntUsr;

    /**
     * @ORM\Column(type="datetime_immutable")
     * @Groups({"user:read"})
     */
    private $ctyCreatedat;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"user:read"})
     */
    private $ctyUpdatedat;

    /**
     * @ORM\OneToMany(targetEntity=Appointment::class, mappedBy="apmCnt", orphanRemoval="true")
     */
    private $appointments;

    public function __construct()
    {
        $this->contactApm = new ArrayCollection();
        $this->appointments = new ArrayCollection();
        $this->ctyCreatedat = new \DateTimeImmutable();
    }

    public function getCtyCreatedat(): ?\DateTimeImmutable
    {
        return $this->ctyCreatedat;
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
        $this->setCntUpdatedatPut();
        $this->setCntUpdatedatPatch();

        return $this;
    }

    public function getCntTel(): ?string
    {
        return $this->cntTel;
    }

    public function setCntTel(?string $cntTel): self
    {
        $this->cntTel = $cntTel;
        $this->setCntUpdatedatPatch();
        return $this;
    }

    public function getCntStreet(): ?string
    {
        return $this->cntStreet;
    }

    public function setCntStreet(?string $cntStreet): self
    {
        $this->cntStreet = $cntStreet;
        $this->setCntUpdatedatPatch();
        return $this;
    }

    public function getCntPostal(): ?string
    {
        return $this->cntPostal;
    }

    public function setCntPostal(?string $cntPostal): self
    {
        $this->cntPostal = $cntPostal;
        $this->setCntUpdatedatPatch();
        return $this;
    }

    public function getCntCity(): ?string
    {
        return $this->cntCity;
    }

    public function setCntCity(?string $cntCity): self
    {
        $this->cntCity = $cntCity;
        $this->setCntUpdatedatPatch();
        return $this;
    }

    public function getCntUsr(): ?User
    {
        return $this->cntUsr;
    }

    public function setCntUsr(?User $cntUsr): self
    {
        $this->cntUsr = $cntUsr;
        $this->setCntUpdatedatPatch();
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
        $this->setCntUpdatedatPatch();
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
        $this->setCntUpdatedatPatch();
        return $this;
    }

    private function setCntUpdatedatPatch(): self
    {
        if($_SERVER["REQUEST_METHOD"] == "PATCH"){
            $this->cntUpdatedat = new \DateTimeImmutable();
        }
        return $this;
    }

    public function getCntUpdatedat(): ?\DateTimeInterface
    {
        return $this->cntUpdatedat;
    }

    private function setCntUpdatedatPut(): self
    {
        if($_SERVER["REQUEST_METHOD"] == "PUT"){
            $this->cntUpdatedat = new \DateTimeImmutable();
        }
        return $this;
    }
}
