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
/*

*     collectionOperations={
    *     "get" = {"access_control" = "is_granted('ROLE_USER') and object.getOwner() == user"},
 *     "post" = {"access_control" = "is_granted('ROLE_USER') and object.getOwner() == user"}},
 *
 *      itemOperations={
    *     "get" = {"access_control" = "is_granted('ROLE_USER') and object.getOwner() == user"},
 *     "patch"  = {"access_control" = "is_granted('ROLE_USER') and object.getOwner() == user"},
 *     "put" = {"access_control" = "is_granted('ROLE_USER') and object.getOwner() == user"},
 *     "delete"  = {"access_control" = "is_granted('ROLE_USER') and object.getOwner() == user"}},

*/

/**
 * @ApiResource(
 *     collectionOperations={
 *     "get",
 *     "post"},
 *
 *      itemOperations={
 *     "get",
 *     "patch",
 *     "put",
 *     "delete"},
 *
 *      normalizationContext={"groups"={"appointments:read"}},
 *      denormalizationContext={"groups"={"appointments:write"}})
 *      @ORM\Entity(repositoryClass=AppointmentRepository::class)
 *      @ApiFilter(SearchFilter::class, properties={"cntUser"})
 *      @ApiFilter(OrderFilter::class, properties={"apmStartsAt"})
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
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"appointments:read", "appointments:write"})
     */
    private $apmDescription;

    /**
     * @ORM\Column(type="datetime_immutable")
     * @Groups({"appointments:read"})
     */
    private $apmCreatedAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"appointments:read"})
     */
    private $apmUpdatedAt;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"appointments:read", "appointments:write"})
     */
    private $apmStartsAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"appointments:read", "appointments:write"})
     */
    private $apmStopsAt;

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
        $this->apmCreatedAt = new \DateTimeImmutable();
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
        $this->setApmUpdatedAtPatch();
        $this->setApmUpdatedAtPut();

        return $this;
    }

    public function getApmDescription(): ?string
    {
        return $this->apmDescription;
    }

    public function setApmDescription(?string $apmDescription): self
    {

        $this->apmDescription = $apmDescription;
        $this->setApmUpdatedAtPatch();
        return $this;
    }

    public function getApmCreatedAt(): ?\DateTimeImmutable
    {
        return $this->apmCreatedAt;
    }

    public function getApmUpdatedAt(): ?\DateTimeInterface
    {
        return $this->apmUpdatedAt;
    }

    public function getApmStartsAt(): ?\DateTimeInterface
    {
        return $this->apmStartsAt;
    }

    public function setApmStartsAt(\DateTimeInterface $apmStartsAt): self
    {
        $this->apmStartsAt = $apmStartsAt;
        $this->setApmUpdatedAtPatch();

        return $this;
    }

    public function getApmStopsAt(): ?\DateTimeInterface
    {
        return $this->apmStopsAt;
    }

    public function setApmStopsAt(?\DateTimeInterface $apmStopsAt): self
    {
        $this->apmStopsAt = $apmStopsAt;
        $this->setApmUpdatedAtPatch();

        return $this;
    }

    public function getApmUsr(): ?User
    {
        return $this->apmUsr;
    }

    public function setApmUsr(?User $apmUsr): self
    {
        $this->apmUsr = $apmUsr;

        return $this;
    }

    private function setApmUpdatedAtPatch(): self
    {
        if($_SERVER["REQUEST_METHOD"] == "PATCH"){
            $this->apmUpdatedAt = new \DateTimeImmutable();
        }
        return $this;
    }

    private function setApmUpdatedAtPut(): self
    {
        if($_SERVER["REQUEST_METHOD"] == "PUT"){
            $this->apmUpdatedAt = new \DateTimeImmutable();
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

        return $this;
    }

}
