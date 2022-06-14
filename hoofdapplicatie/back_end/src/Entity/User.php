<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;


use App\Repository\UserRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use mysql_xdevapi\Exception;
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
 *     denormalizationContext={"groups"={"user:write"}}
 * )
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @UniqueEntity(fields={"usrMail"})
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
    private $username;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * @groups({"user:write"})
     * @SerializedName("password")
     */
    private $plainPassword;

    /**
     * @ORM\OneToMany(targetEntity=Appointment::class, mappedBy="apmUsr", orphanRemoval=true)
     *
     */
    private $appointments;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     * @Groups({"user:read", "user:write"})
     * @Assert\NotBlank
     * @Assert\Email
     */
    private $usrMail;

    /**
     * @ORM\OneToMany(targetEntity=Todo::class, mappedBy="tdoUsr", orphanRemoval=true)
     * @Groups({"user:read", "user:write"})
     */
    private $todos;

    /**
     * @ORM\Column(type="datetime_immutable")
     */
    private $usrCreatedAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"user:read"})
     */
    private $usrUpdatedAt;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"user:read","user:write"})
     */
    private $usrPicture;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"user:read","user:write"})
     */
    private $usrHasAgreed;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isVerified = false;

    /**
     * @ORM\OneToMany(targetEntity=Contact::class, mappedBy="cntUser", orphanRemoval="true")
     */
    private $contacts;

    public function __construct()
    {

        $this->appointments = new ArrayCollection();
        $this->todos = new ArrayCollection();
        $this->usrCreatedAt = new \DateTimeImmutable();
        $this->contacts = new ArrayCollection();

    }

    public function getIsVerified(): ?bool
    {
        return $this->isVerified;
    }

    public function setIsVerified(bool $isVerified): self
    {

        $this->isVerified = $isVerified;
        return $this;

    }


    public function getUsrMail(): ?string
    {
        return $this->usrMail;
    }

    public function setUsrMail(string $usrMail): self
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

    public function getUsrCreatedAt(): ?\DateTimeImmutable
    {
        return $this->usrCreatedAt;
    }

    public function setUsrUpdatedAt(?\DateTimeInterface $usrUpdatedAt): self
    {
        $this->usrUpdatedAt = $usrUpdatedAt;

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

    public function isUsrHasAgreed(): ?bool
    {
        return $this->usrHasAgreed;
    }

    public function setUsrHasAgreed(bool $usrHasAgreed): self
    {

        //The user always has to give permission to use his/hers data before storage
        if($usrHasAgreed === true){
            $this->usrHasAgreed = $usrHasAgreed;
            return $this;
        }else throw new \Exception("The user has to agree to the users agreement");

    }

    public function getUsrUpdatedAt(): ?\DateTimeInterface
    {
        return $this->usrUpdatedAt;
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
        return (string) $this->username;
    }

    public function setUsername(string $username): self
    {
            $name = $username;
            if (empty($name)) {
                throw new Exception("Name is required");
            } else if (!preg_match("/^[a-zA-Z-' ]*$/",$name)) {
                    $nameErr = "Only letters and white space allowed";
                }


        $this->username = trim($username);

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->username;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {

        $this->password = $password;

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
     * @Groups({"user:read", "user:write"})
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
     * @Groups({"user:read", "user:write"})
     */
    public function getContacts(): Collection
    {
        return $this->contacts;
    }

    public function addContact(Contact $contact): self
    {
        if (!$this->contacts->contains($contact)) {
            $this->contacts[] = $contact;
            $contact->setCntUser($this);
        }

        return $this;
    }

    public function removeContact(Contact $contact): self
    {
        if ($this->contacts->removeElement($contact)) {
            // set the owning side to null (unless already changed)
            if ($contact->getCntUser() === $this) {
                $contact->setCntUser(null);
            }
        }

        return $this;
    }

}