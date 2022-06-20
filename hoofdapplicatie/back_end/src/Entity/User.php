<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;


use App\Repository\UserRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\ArrayCollection;

/**
     * @ApiResource(
     *     normalizationContext={"groups"={"user:read"}},
     *     denormalizationContext={"groups"={"user:write"}},
     *          collectionOperations={
     *          "get",
     *          "post"={
     *              "access_control"="is_granted('IS_AUTHENTICATED_ANONYMOUSLY')",
     *              "validation_groups"={"Default", "create"}
     *          },
     *     },
     *      itemOperations={
     *      "get" = {"access_control" = "is_granted('ROLE_USER')"},
     *      "patch"  = {"access_control" = "is_granted('ROLE_USER')"},
     *      "put" = {"access_control" = "is_granted('ROLE_USER')"},
     *      "delete"  = {"access_control" = "is_granted('ROLE_USER')"}},
     * )
     *
     * @ORM\Entity(repositoryClass=UserRepository::class)
     * @UniqueEntity(fields={"usrMail"})
     * @UniqueEntity(fields={"usrName"})
 */
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"user:read","user:write","appointments:read","todo_details:read","contacts:read","contacts:write"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180)
     * @Groups({"user:read", "user:write"})
     * @Assert\NotBlank()
     */
    private $usrName;

    /**
     * @ORM\Column(type="json")
     */
    private $usrRoles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    private $usrPassword;

    /**
     * @groups({"user:write"})
     * @SerializedName("usrPassword")
     * @Assert\NotBlank(groups={"create"})
     */
    private $plainPassword;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     * @Groups({"user:read", "user:write"})
     * @Assert\NotBlank
     * @Assert\Email
     */
    private $usrMail;

    /**
     * @ORM\OneToMany(targetEntity=Todo::class, mappedBy="tdoUsr", orphanRemoval=true)
     */
    private $todos;

    /**
     * @ORM\Column(type="datetime_immutable")
     * @Groups({"user:read"})
     */
    private $usrCreatedat;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"user:read"})
     */
    private $usrUpdatedat;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"user:read","user:write"})
     */
    private $usrPicture;

    /**
     * @ORM\OneToMany(targetEntity=Appointment::class, mappedBy="apmUsr", orphanRemoval=true)
     *
     */
    private $appointments;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"user:write"})
     */
    private $usrHasagreed;

    /**
     * @ORM\OneToMany(targetEntity=Contact::class, mappedBy="cntUsr", orphanRemoval="true")
     */
    private $contacts;

    public function __construct()
    {

        $this->appointments = new ArrayCollection();
        $this->todos = new ArrayCollection();
        $this->usrCreatedat = new \DateTimeImmutable();
        $this->contacts = new ArrayCollection();

    }

    public function getUsrmail(): ?string
    {
        return $this->usrMail;
    }

    public function setUsrmail(string $usrMail): self
    {
        //Checks if the email address is valid for storing
        $email = $usrMail;
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $emailErr = "Invalid email format";
            throw new \Exception($emailErr);
        }

        $this->usrMail = $usrMail;

        return $this;
    }

    public function getUsrCreatedat(): ?\DateTimeImmutable
    {
        return $this->usrCreatedat;
    }

    public function setUsrUpdatedat(?\DateTimeInterface $usrUpdatedat): self
    {
        $this->usrUpdatedat = $usrUpdatedat;

        return $this;
    }

    public function getUsrPicture(): ?string
    {
        return $this->usrPicture;
    }

    public function setUsrPicture(?string $usrPicture): self
    {
        $this->usrPicture = $usrPicture;

        return $this;
    }

    public function isusrHasagreed(): ?bool
    {
        return $this->usrHasagreed;
    }

    public function setusrHasagreed(bool $usrHasagreed = false): self
    {

        //The user always has to give permission to use his/hers data before storage
        if($usrHasagreed === true){
            $this->usrHasagreed = $usrHasagreed;
            return $this;
        }else throw new \Exception("The user has to agree to the users agreement");

    }

    public function getUsrUpdatedat(): ?\DateTimeInterface
    {
        return $this->usrUpdatedat;
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @deprecated since Symfony 5.3, use getUserIdentifier instead
     */
    public function getUsername(): string
    {
        return $this->usrName;
    }

    public function getUsrname(): string
    {
        return $this->usrName;
    }

    public function setusrName(string $usrName): self
    {
            $name = $usrName;
            if (empty($name)) {
                throw new Exception("Name is required");
            } else if (!preg_match("/^[a-zA-Z-' ]*$/",$name)) {
                    $nameErr = "Only letters and white space allowed";
                }


        $this->usrName = strip_tags(trim($usrName));

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->usrName;
    }

    public function __toString()
    {
        return $this->usrName;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->usrRoles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setUsrRoles(array $roles): self
    {
        $this->usrRoles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->usrPassword;
    }

    public function setPassword(string $usrPassword): self
    {

        $this->usrPassword = $usrPassword;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        $this->plainPassword = null;
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
            $appointment->setUsr($this);
        }

        return $this;
    }

    public function removeAppointment(Appointment $appointment): self
    {
        if ($this->appointments->removeElement($appointment)) {
            // set the owning side to null (unless already changed)
            if ($appointment->getUsr() === $this) {
                $appointment->setUsr(null);
            }
        }

        return $this;
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
            $todo->setTdoUsr($this);
        }

        return $this;
    }

    public function removeTodo(Todo $todo): self
    {
        if ($this->todos->removeElement($todo)) {
            // set the owning side to null (unless already changed)
            if ($todo->getTdoUsr() === $this) {
                $todo->setTdoUsr(null);
            }
        }

        return $this;
    }

    /**
     * @return mixed
     */
    public function getPlainPassword()
    {
        return $this->plainPassword;
    }

    /**
     * @param mixed $plainPassword
     * @throws \Exception
     */
    public function setPlainPassword($plainPassword): self
    {


        if(strlen($plainPassword) > 6 ){
            if(preg_match_all("([0-9])",$plainPassword ) >=3 &&
                preg_match_all("([A-Za-z])", $plainPassword) >=3 )
            {
                $this->plainPassword = $plainPassword;
            }else throw new \Exception("The password should have at least 3 letters and 3 numbers.");

        }
        else throw new \Exception("The password should be more than 6 characters long.");

        return $this;
    }

    /**
     * @return Collection<int, Contact>
     */
    public function getContacts(): Collection
    {
        return $this->contacts;
    }

    public function addContact(Contact $contact): self
    {
        if (!$this->contacts->contains($contact)) {
            $this->contacts[] = $contact;
            $contact->setCntUsr($this);
        }

        return $this;
    }

    public function removeContact(Contact $contact): self
    {
        if ($this->contacts->removeElement($contact)) {
            // set the owning side to null (unless already changed)
            if ($contact->getCntUsr() === $this) {
                $contact->setCntUsr(null);
            }
        }

        return $this;
    }


}