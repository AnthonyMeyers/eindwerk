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

/**
    * @ApiResource(
    *   collectionOperations={
    *     "get" = {"access_control" = "is_granted('ROLE_USER')"}},
    *
    *   itemOperations={
    *     "get" = {"access_control" = "is_granted('ROLE_USER')"}},
    *
    *    normalizationContext={"groups"={"categories:read"}})
    *
    *  @ORM\Entity(repositoryClass=CategoryRepository::class)
    *  @ApiFilter(BooleanFilter::class, properties={"ctyIsclassavailable"})
*/

//Todo list op categories afgeblokt, dit is onnodig en kan te veel informatie meegeven.

class Category
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"categories:read","todo_details:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=100)
     * @Groups({"categories:read"})
     */
    private $ctyTitle;

    /**
     * @ORM\Column(type="string", length=100)
     * @Groups({"categories:read"})
     */
    private $ctyClass;

    /**
     * @ORM\Column(type="boolean", length=1)
     * @Groups({"categories:read"})
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
        return ucfirst($this->ctyTitle);
    }

    public function setCtyTitle(string $ctyTitle): self
    {
        $this->ctyTitle = trim(strip_tags($ctyTitle));

        return $this;
    }

    public function getCtyClass(): ?string
    {
        return $this->ctyClass;
    }

    public function setCtyClass(string $ctyClass): self
    {
        $this->ctyClass = trim(strip_tags($ctyClass));

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
