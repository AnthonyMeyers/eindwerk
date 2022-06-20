<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\TodoRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

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
     *     normalizationContext={"groups"={"todo_details:read"}},
     *     denormalizationContext={"groups"={"todo_details:write"}})
     *
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
     * @ORM\Column(type="boolean")
     * @Groups({"todo_details:read", "todo_details:write"})
     */
    private $tdoIsdone;

    /**
     * @ORM\Column(type="datetime_immutable")
     */
    private $tdoCreatedat;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $tdoUpdatedat;

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

        $this->tdoCreatedat = new \DateTimeImmutable();

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
        $this->setTdoUpdatedat();
        return $this;
    }

    public function istdoIsdone(): ?bool
    {
        return $this->tdoIsdone;
    }

    public function settdoIsdone(string $tdoIsdone): self
    {
        $this->tdoIsdone = $tdoIsdone;
        $this->setTdoUpdatedat();
        return $this;
    }

    public function getTdoCreatedat(): ?\DateTimeImmutable
    {
        return $this->tdoCreatedat;
    }

    public function getTdoUpdatedat(): ?\DateTimeInterface
    {
        return $this->tdoUpdatedat;
    }

    public function getTdoUsr(): ?User
    {
        return $this->tdoUsr;
    }

    public function setTdoUsr(?User $tdoUsr): self
    {
        $this->tdoUsr = $tdoUsr;
        $this->setTdoUpdatedat();
        return $this;
    }

    public function getTdoPty(): ?Priority
    {
        return $this->tdoPty;
    }

    public function setTdoPty(?Priority $tdoPty): self
    {
        $this->tdoPty = $tdoPty;
        $this->setTdoUpdatedat();
        return $this;
    }

    public function getTdoCty(): ?Category
    {
        return $this->tdoCty;
    }

    public function setTdoCty(?Category $tdoCty): self
    {
        $this->tdoCty = $tdoCty;
        $this->setTdoUpdatedat();
        return $this;
    }

    private function setTdoUpdatedat(): self
    {
        if($_SERVER["REQUEST_METHOD"] == "PATCH" || $_SERVER["REQUEST_METHOD"] == "PUT"){
            $this->tdoUpdatedat = new \DateTimeImmutable();
        }
        return $this;
    }

}