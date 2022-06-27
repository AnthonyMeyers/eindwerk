<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ContactRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use mysql_xdevapi\Exception;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use Symfony\Component\Validator\Constraints as Assert;

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
    *  normalizationContext={"groups"={"contacts:read"}},
    *  denormalizationContext={"groups"={"contacts:write"}}))
    *
    * @ORM\Entity(repositoryClass=ContactRepository::class)
    * @UniqueEntity(fields={"cntName","cntUsr"}, message="You already have this contact.")
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
    private $cntMail;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="contacts")
     * @Groups({"contacts:read","contacts:write"})
     * @Assert\NotBlank()
     */
    private $cntUsr;

    /**
     * @ORM\Column(type="datetime_immutable")
     * @Groups({"user:read"})
     */
    private $cntCreatedat;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"user:read"})
     */
    private $cntUpdatedat;

    /**
     * @ORM\OneToMany(targetEntity=Appointment::class, mappedBy="apmCnt",orphanRemoval=false)
     */
    private $appointments;

    public function __construct()
    {
        $this->contactApm = new ArrayCollection();
        $this->appointments = new ArrayCollection();
        $this->cntCreatedat = new \DateTimeImmutable();
    }


    public function getCntCreatedat(): ?\DateTimeImmutable
    {
        return $this->cntCreatedat;
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
        return ucfirst($this->cntName);
    }

    public function setCntName(string $cntName): self
    {

        if(strlen($cntName) <= 3)
        {
            throw new Exception("To short to add");
        }

        if(strlen($cntName) > 22)
        {
            throw new Exception("To short long to add");
        }

        if (!preg_match("/^[A-Za-z\s.ç'_,]*$/",$cntName))
        {
            throw new Exception("Invalid characters");
        }

        $this->cntName = trim(strip_tags($cntName));
        $this->setCntUpdatedat();

        return $this;
    }

    public function getCntTel(): ?string
    {
        return $this->cntTel;
    }

    public function setCntTel(?string $cntTel): self
    {

        if($cntTel != null && strlen($cntTel) != 0 && strlen($cntTel) < 9)
        {
            throw new Exception("Tel. is to short");
        }

        if(strlen($cntTel) > 15)
        {
            throw new Exception("Tel. is to long");
        }

        $this->cntTel = trim(strip_tags($cntTel)) ;
        $this->setCntUpdatedat();
        return $this;
    }

    /**
     * @return string
     */
    public function getCntMail(): string
    {
        return $this->cntMail;
    }

    /**
     * @param string $cntMail
     * @return Contact
     */
    public function setCntMail(string $cntMail): self
    {
        $email = $cntMail;
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new \Exception("Invalid email format");
        }
        $this->setCntUpdatedat();
        $this->cntMail = trim(strip_tags($email));
        return $this;
    }

    public function getCntStreet(): ?string
    {
        return $this->cntStreet;
    }

    public function setCntStreet(?string $cntStreet): self
    {
        if($cntStreet != null && strlen($cntStreet) != 0 && strlen($cntStreet) <= 6)
        {
            throw new Exception("To short to add");
        }

        if(strlen($cntStreet) > 40)
        {
            throw new Exception("To long to add");
        }

        if (!preg_match("/^[A-Za-z0-9\s.']*$/",$cntStreet))
        {
            throw new Exception("Invalid characters");
        }

        $this->cntStreet = trim(strip_tags($cntStreet));
        $this->setCntUpdatedat();
        return $this;
    }

    public function getCntPostal(): ?string
    {

        return $this->cntPostal;
    }

    public function setCntPostal(?string $cntPostal): self
    {
        if($cntPostal != null && strlen($cntPostal) != 0 && strlen($cntPostal) < 4)
        {
            throw new Exception("Postal code to short");
        }

        if(strlen($cntPostal) > 10)
        {
            throw new Exception("Postal code to long");
        }

        if (!preg_match("/^[A-Za-z0-9\s]*$/",$cntPostal))
        {
            throw new Exception("Postal has invalid characters");
        }

        $this->cntPostal = trim(strip_tags($cntPostal));
        $this->setCntUpdatedat();
        return $this;
    }

    public function getCntCity(): ?string
    {
        return ucfirst($this->cntCity);
    }

    public function setCntCity(?string $cntCity): self
    {
        if($cntCity != null && strlen($cntCity) != 0 && strlen($cntCity) < 4)
        {
            throw new Exception("City name to short");
        }

        if(strlen($cntCity) > 22)
        {
            throw new Exception("City name to long");
        }

        if (!preg_match("/^[A-Za-z\s.ç'_,]*$/",$cntCity))
        {
            throw new Exception("City name has invalid characters");
        }

        $this->cntCity = trim(strip_tags($cntCity));
        $this->setCntUpdatedat();
        return $this;
    }

    public function getCntUsr(): ?User
    {
        return $this->cntUsr;
    }

    public function setCntUsr(?User $cntUsr): self
    {
        $this->cntUsr = $cntUsr;
        $this->setCntUpdatedat();
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

    private function setCntUpdatedat(): self
    {
        if($_SERVER["REQUEST_METHOD"] == "PATCH" || $_SERVER["REQUEST_METHOD"] == "PUT"){
            $this->cntUpdatedat = new \DateTimeImmutable();
        }
        return $this;
    }

    public function getCntUpdatedat(): ?\DateTimeInterface
    {
        return $this->cntUpdatedat;
    }

}
