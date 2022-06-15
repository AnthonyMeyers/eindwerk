<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\BooleanFilter;

/*
*     "get" = {"access_control" = "is_granted('ROLE_USER')"},
 *     "post" = {"access_control" = "is_granted('ROLE_ADMIN')"}},
 *
 *      itemOperations={
    *     "get" = {"access_control" = "is_granted('ROLE_USER')"},
 *     "delete"  = {"access_control" = "is_granted('ROLE_ADMIN')"}},
*/



/**
 * @ApiResource(
 *     collectionOperations={
 *     "get",
 *     "post"},
 *
 *      itemOperations={
 *     "get",
 *     "delete"},
 *
 *     collectionOperations={"get","post"},
 *     itemOperations={"get"={"normalization_context"={"groups"={"category:item:get"}}},"delete"},
 *     normalizationContext={"groups"={"categories:read"}},
 *     denormalizationContext={"groups"={"categories:write"}})
 * @ORM\Entity(repositoryClass=CategoryRepository::class)
*  @ApiFilter(BooleanFilter::class, properties={"ctyIsclassavailable"})
 */

//Todo list op categories afgeblokt, dit is onnodig en kan te veel informatie meegeven.

class Category
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"categories:read","category:item:get","todo_details:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=100)
     * @Groups({"categories:read", "categories:write","category:item:get"})
     */
    private $ctyTitle;

    /**
     * @ORM\Column(type="string", length=100)
     * @Groups({"categories:read", "categories:write","category:item:get"})
     */
    private $ctyClass;

    /**
     * @ORM\Column(type="boolean", length=1)
     * @Groups({"categories:read", "categories:write","category:item:get"})
     */
    private $ctyIsclassavailable;

    /**
     * @ORM\OneToMany(targetEntity=Todo::class, mappedBy="tdoCty", cascade={"remove"})
     */
    private $todos;

    public function __construct()
    {
        $this->todos = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function __toString()
    {
        return $this->ctyTitle;
    }

    public function getCtyTitle(): ?string
    {
        return $this->ctyTitle;
    }

    public function setCtyTitle(string $ctyTitle): self
    {
        $this->ctyTitle = ucfirst($ctyTitle);

        return $this;
    }

    public function getCtyClass(): ?string
    {
        return $this->ctyClass;
    }

    public function setCtyClass(string $ctyClass): self
    {
        $this->ctyClass = $ctyClass;

        return $this;
    }

    public function getCtyIsClassAvailable(): ?bool
    {
        return $this->ctyIsclassavailable;
    }


    public function setCtyIsClassAvailable(bool $isAvailable): self
    {
        $this->ctyIsclassavailable = $isAvailable;

        return $this;
    }

    /**
     * @return integer
     * @Groups({"category:item:get"})
     * Counts the total todos with this category, this for admin dashboard overall view
     */
    public function getCountTodosByCategory(): int
    {
        return $this->todos->count($this->getId());
    }

    /**
     * @return Collection<int, Todo>
     */
    public function getTodos(): Collection
    {
        return $this->todos;
    }

    public function addTodo(Todo $todo): self
    {
        if (!$this->todos->contains($todo)) {
            $this->todos[] = $todo;
            $todo->setTdoCty($this);
        }

        return $this;
    }

    public function removeTodo(Todo $todo): self
    {
        if ($this->todos->removeElement($todo)) {
            // set the owning side to null (unless already changed)
            if ($todo->getTdoCty() === $this) {
                $todo->setTdoCty(null);
            }
        }

        return $this;
    }
}
