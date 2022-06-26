<?php

namespace App\Controller\Admin;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserCrudController extends AbstractCrudController
{

    /**
     * @var UserPasswordEncoderInterface
     */
    private $passwordEncoder;

    /**
     * UserCrudController constructor.
     * @param UserPasswordEncoderInterface $passwordEncoder
     */
    public function __construct(
        UserPasswordEncoderInterface $passwordEncoder
    ) {
        $this->passwordEncoder = $passwordEncoder;
    }


    public static function getEntityFqcn(): string
    {
        return User::class;
    }

    //Stelt de userfields in voor de usertab
    //Geeft extra opties mee met het password veld
    public function configureFields(string $pageName): iterable
    {
        $password = TextField::new('clearpassword')
            ->setLabel("Replace password")
            ->setFormType(PasswordType::class)
            ->setFormTypeOption('empty_data', '')
            ->setRequired(false)
            ->hideOnIndex()->onlyWhenUpdating();

        $newpassword = TextField::new('clearpassword')
            ->setLabel("New Password")
            ->setFormType(PasswordType::class)
            ->setFormTypeOption('empty_data', '')
            ->setRequired(true)
            ->hideOnIndex();

        $fields = [];


        return [
            IdField::new('id')->hideOnForm(),
            TextField::new('usrName','Name'),
            $password,
            $newpassword,
            TextField::new('usrMail','Email'),
            TextField::new('usrPicture','Avatar')->hideOnIndex(),
            ChoiceField::new('usrRoles','Roles')->renderExpanded()
                ->setChoices(["Administrator role"=>"ROLE_ADMIN","Standard role"=>"ROLE_USER"])->allowMultipleChoices(),
            BooleanField::new('usrHasagreed', 'Did agree')
                ->setRequired(true)->hideWhenUpdating(),
            BooleanField::new('usrHasagreed', 'Did agree')
            ->hideWhenCreating()->setDisabled(),
            DateTimeField::new('usrCreatedat','Created')->hideOnForm(),
            DateTimeField::new('usrUpdatedat', 'Last updated by user')->hideOnForm(),
        ];
    }
    //Op de user tabel mag geen batch delete uitgevoerd worden, dit moet één per één gebeuren
    public function configureActions(Actions $actions): Actions
    {
        return parent::configureActions($actions)->disable(Action::BATCH_DELETE);
    }

    //Zorgt voor passwordencoding als deze van easyadmin komt
    public function updateEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {

        // set new password with encoder interface
        if (method_exists($entityInstance, 'setPassword') && !$this->get('request_stack')->getCurrentRequest()->isXmlHttpRequest()) {

            $clearPassword = trim($this->get('request_stack')->getCurrentRequest()->request->all()['User']['clearpassword']);

            if ( !empty($clearPassword) ) {
                $encodedPassword = $this->passwordEncoder->encodePassword($this->getUser(), $clearPassword);
                $entityInstance->setPassword($encodedPassword);
            }
        }

        parent::updateEntity($entityManager, $entityInstance);
    }


}
