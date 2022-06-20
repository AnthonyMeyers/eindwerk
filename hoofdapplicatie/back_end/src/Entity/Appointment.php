<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\AppointmentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;

/**
    * @ApiResource(
    *     collectionOperations={
    *     "get" = {"access_control" = "is_granted('ROLE_USER')"},
    *     "post" = {"access_control" = "is_granted('ROLE_USER')"}},
    *
    *      itemOperations={
    *     "get" = {"access_control" = "is_granted('ROLE_USER')"},
    *     "patch"  = {"access_control" = "is_granted('ROLE_USER')"},
    *     "put" = {"access_control" = "is_granted('ROLE_USER')"},
    *     "delete"  = {"access_control" = "is_granted('ROLE_USER')"}},
    *
    *   normalizationContext={"groups"={"appointments:read"}},
    *   denormalizationContext={"groups"={"appointments:write"}})
    *   @ORM\Entity(repositoryClass=AppointmentRepository::class)
    *   @ApiFilter(SearchFilter::class, properties={"cntUser"})
    *   @ApiFilter(OrderFilter::class, properties={"apmStartsat"})
 */
class Appointment
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"appointments:read","user:read"})
     * @Groups({"appointments:read", "appointments:write"})
     *
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=100)
     * @Groups({"appointments:read", "appointments:write","user:read"})
     */
    private $apmTitle;

    /**
     * @ORM\Column(type="datetime_immutable")
     * @Groups({"appointments:read"})
     */
    private $apmCreatedat;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"appointments:read"})
     */
    private $apmUpdatedat;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"appointments:read", "appointments:write"})
     */
    private $apmStartsat;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"appointments:read", "appointments:write"})
     */
    private $apmStopsat;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="appointments")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"appointments:read", "appointments:write"})
     */
    private $apmUsr;

    /**
     * @ORM\ManyToOne(targetEntity=Contact::class, inversedBy="appointments")
     * @Groups({"appointments:read", "appointments:write"})
     */
    private $apmCnt;

    public function __construct()
    {
        $this->apmCreatedat = new \DateTimeImmutable();
        $this->apmContact = new ArrayCollection();

    }

    public function __toString()
    {
        return $this->apmTitle;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getApmTitle(): ?string
    {
        return $this->apmTitle;
    }

    public function setApmTitle(string $apmTitle): self
    {
        $this->apmTitle = $apmTitle;
        $this->setApmUpdatedat();
        return $this;
    }

    public function getApmCreatedat(): ?\DateTimeImmutable
    {
        return $this->apmCreatedat;
    }

    public function getApmUpdatedat(): ?\DateTimeInterface
    {
        return $this->apmUpdatedat;
    }

    public function getApmStartsat(): ?\DateTimeInterface
    {
        return $this->apmStartsat;
    }

    public function setApmStartsat(\DateTimeInterface $apmStartsat): self
    {
        $this->apmStartsat = $apmStartsat;
        $this->setApmUpdatedat();
        return $this;
    }

    public function getApmStopsat(): ?\DateTimeInterface
    {
        return $this->apmStopsat;
    }

    public function setApmStopsat(?\DateTimeInterface $apmStopsat): self
    {
        $this->apmStopsat = $apmStopsat;
        $this->setApmUpdatedat();
        return $this;
    }

    public function getApmUsr(): ?User
    {
        return $this->apmUsr;
    }

    public function setApmUsr(?User $apmUsr): self
    {
        $this->apmUsr = $apmUsr;
        $this->setApmUpdatedat();
        return $this;
    }

    private function setApmUpdatedat(): self
    {
        if($_SERVER["REQUEST_METHOD"] == "PATCH" ||$_SERVER["REQUEST_METHOD"] == "PUT" ){
            $this->apmUpdatedat = new \DateTimeImmutable();
        }
        return $this;
    }

    public function getApmCnt(): ?Contact
    {
        return $this->apmCnt;
    }

    public function setApmCnt(?Contact $apmCnt): self
    {

        $this->apmCnt = $apmCnt;
        $this->setApmUpdatedat();
        return $this;
    }

}
