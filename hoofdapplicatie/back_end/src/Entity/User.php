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
     *          "get" = {"access_control" = "is_granted('ROLE_USER')"},
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
     * @UniqueEntity(fields={"usrName"}, message="Name is already taken")
     * @UniqueEntity(fields={"usrMail"}, message="Mail is already taken")
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
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups({"user:read", "user:write"})
     * @Assert\NotBlank
     */
    private $usrName;

    /**
     * @ORM\Column(type="json)
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

    /**
     * @param string $usrMail
     * @return $this
     * @throws \Exception
     */
    public function setUsrmail(string $usrMail): self
    {
        //Checks if the email address is valid for storing
        $email = trim(strip_tags($usrMail));
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new \Exception("Invalid email format");
        }else {
            $this->setUsrUpdatedat();
            $this->usrMail = $usrMail;
        }


        return $this;
    }

    public function getUsrCreatedat(): ?\DateTimeImmutable
    {
        return $this->usrCreatedat;
    }

    public function getUsrPicture(): ?string
    {
        return $this->usrPicture;
    }

    public function setUsrPicture(?string $usrPicture): self
    {
        $this->setUsrUpdatedat();
        $this->usrPicture = trim(strip_tags($usrPicture));
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
            $this->setUsrUpdatedat();
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
     * Needed for functionality of the class, else class needs to be declared abstract or interface
     */
    public function getUsername(): string
    {

        return ucfirst($this->usrName);
    }

    public function getUsrName(): string
    {
        return ucfirst($this->usrName);
    }

    public function setUsrName(string $usrName): self
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

    //Geeft php de mogelijkheid om, indien dit als een object terugkomt, hier een string van te maken
    public function __toString()
    {
        return $this->usrName;
    }

    /**
     * @see UserInterface
     * Needed for functionality of the class, else class needs to be declared abstract or interface
     */
    public function getRoles(): array
    {
        $roles = $this->usrRoles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @see UserInterface
     */
    public function getUsrRoles(): array
    {
        $roles = $this->usrRoles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setUsrRoles(array $roles): self
    {

        $this->usrRoles = $roles;
        $this->setUsrUpdatedat();

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     * Needed for functionality of the class, else class needs to be declared abstract or interface
     */
    public function getPassword(): string
    {
        return $this->usrPassword;
    }

    public function setPassword(string $usrPassword): self
    {
        $this->usrPassword = $usrPassword;
        $this->setUsrUpdatedat();
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
            $appointment->setApmUsr($this);
        }

        return $this;
    }

    public function removeAppointment(Appointment $appointment): self
    {
        if ($this->appointments->removeElement($appointment)) {
            // set the owning side to null (unless already changed)
            if ($appointment->getApmUsr() === $this) {
                $appointment->getApmUsr(null);
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
                $this->setUsrUpdatedat();
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

    private function setUsrUpdatedat(): self
    {
        if($_SERVER["REQUEST_METHOD"] == "PATCH" || $_SERVER["REQUEST_METHOD"] == "PUT"){
            $this->usrUpdatedat = new \DateTimeImmutable();
        }
        return $this;
    }

    //...

    /**
     * @var string clear password for backend
     */
    private $clearpassword;

    /**
     * @return string
     */
    public function getClearpassword(): string
    {
        if( $this->clearpassword == null ) return "";
        return $this->clearpassword;
    }

    /**
     * @param string $clearpassword
     */
    public function setClearpassword(string $clearpassword): void
    {

        $this->setPassword($clearpassword);
    }


}