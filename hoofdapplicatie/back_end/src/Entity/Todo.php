<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\TodoRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

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
 *     normalizationContext={"groups"={"todo_details:read"}},
 *     denormalizationContext={"groups"={"todo_details:write"}})
 * @ORM\Entity(repositoryClass=TodoRepository::class)
 * @ApiFilter(SearchFilter::class, properties={"tdoUsr"})
 */
class Todo
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"todo_details:read","user:read"})
     *
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=150)
     * @Groups({"todo_details:read", "todo_details:write","user:read"})
     */
    private $tdoTitle;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"todo_details:read", "todo_details:write"})
     */
    private $tdoDescription;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"todo_details:read", "todo_details:write"})
     */
    private $tdoIsDone;

    /**
     * @ORM\Column(type="datetime_immutable")
     */
    private $tdoCreatedAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $tdoUpdatedAt;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="todos")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"todo_details:read", "todo_details:write"})
     */
    private $tdoUsr;

    /**
     * @ORM\ManyToOne(targetEntity=Priority::class, inversedBy="todos")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"todo_details:read", "todo_details:write"})
     */
    private $tdoPty;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="todos")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"todo_details:read", "todo_details:write"})
     */
    private $tdoCty;

    public function __construct()
    {

        $this->tdoCreatedAt = new \DateTimeImmutable();

    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTdoTitle(): ?string
    {
        return $this->tdoTitle;
    }

    public function setTdoTitle(string $tdoTitle): self
    {
        $this->tdoTitle = $tdoTitle;

        return $this;
    }

    public function getTdoDescription(): ?string
    {
        return $this->tdoDescription;
    }

    public function setTdoDescription(?string $tdoDescription = null): self
    {
        $this->tdoDescription = $tdoDescription;

        return $this;
    }

    public function isTdoIsDone(): ?bool
    {
        return $this->tdoIsDone;
    }

    public function setTdoIsDone(string $tdoIsDone): self
    {
        $this->tdoIsDone = $tdoIsDone;

        return $this;
    }

    public function getTdoCreatedAt(): ?\DateTimeImmutable
    {
        return $this->tdoCreatedAt;
    }

    public function getTdoUpdatedAt(): ?\DateTimeInterface
    {
        return $this->tdoUpdatedAt;
    }

    public function setTdoUpdatedAt(?\DateTimeInterface $tdoUpdatedAt = null): self
    {
        $this->tdoUpdatedAt = $tdoUpdatedAt;

        return $this;
    }

    public function getTdoUsr(): ?User
    {
        return $this->tdoUsr;
    }

    public function setTdoUsr(?User $tdoUsr): self
    {
        $this->tdoUsr = $tdoUsr;

        return $this;
    }

    public function getTdoPty(): ?Priority
    {
        return $this->tdoPty;
    }

    public function setTdoPty(?Priority $tdoPty): self
    {
        $this->tdoPty = $tdoPty;

        return $this;
    }

    public function getTdoCty(): ?Category
    {
        return $this->tdoCty;
    }

    public function setTdoCty(?Category $tdoCty): self
    {
        $this->tdoCty = $tdoCty;

        return $this;
    }
}