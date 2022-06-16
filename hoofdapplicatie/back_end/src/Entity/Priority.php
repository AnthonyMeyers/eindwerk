<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\PriorityRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
     * @ApiResource(
     *      collectionOperations={
     *      "get" = {"access_control" = "is_granted('ROLE_USER')"}},
     *
     *   itemOperations={"get" = {"access_control" = "is_granted('ROLE_USER')"}},
     *
     *  normalizationContext={"groups"={"priorities:read"}},
     *  denormalizationContext={"groups"={"priorities:write"}}))
     *
     * @ORM\Entity(repositoryClass=PriorityRepository::class)
 */

//Todo list op priority afgeblokt, dit is onnodig en kan te veel informatie meegeven.

class Priority
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"priorities:read","todo_details:read"})
     *
     */
    private $id;

    /**
     * @ORM\Column(type="smallint")
     * @Groups({"priorities:read", "priorities:write"})
     */
    private $ptyRating;

    /**
     * @ORM\Column(type="string", length=100)
     * @Groups({"priorities:read", "priorities:write"})
     */
    private $ptyTitle;

    /**
     * @ORM\OneToMany(targetEntity=Todo::class, mappedBy="tdoPty", orphanRemoval=false)
     */
    private $todos;



    public function __construct()
    {
        $this->todos = new ArrayCollection();
    }

    public function __toString()
    {
        return $this->ptyTitle;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPtyRating(): ?int
    {
        return $this->ptyRating;
    }

    public function setPtyRating(int $ptyRating): self
    {
        $this->ptyRating = $ptyRating;

        return $this;
    }

    public function getPtyTitle(): ?string
    {
        return $this->ptyTitle;
    }

    public function setPtyTitle(string $ptyTitle): self
    {
        $this->ptyTitle = ucfirst($ptyTitle);

        return $this;
    }

    /**
     * @return integer
     * @Groups({"priority:item:get"})
     * Counts the total todos with this priority, this for admin dashboard overall view
     *
     */
    public function getCountTodosByPriority(): int
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
            $todo->setTdoPty($this);
        }

        return $this;
    }

    public function removeTodo(Todo $todo): self
    {
        if ($this->todos->removeElement($todo)) {
            // set the owning side to null (unless already changed)
            if ($todo->getTdoPty() === $this) {
                $todo->setTdoPty(null);
            }
        }

        return $this;
    }


}
