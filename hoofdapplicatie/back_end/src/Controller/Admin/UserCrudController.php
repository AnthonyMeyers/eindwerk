<?php

namespace App\Controller\Admin;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
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

    public function configureFields(string $pageName): iterable
    {
        $password = TextField::new('clearpassword')
            ->setLabel("New Password")
            ->setFormType(PasswordType::class)
            ->setFormTypeOption('empty_data', '')
            ->setRequired(false)
            ->setHelp('If the right is not given, leave the field blank.')
            ->hideOnIndex();

        return [
            IdField::new('id')->hideOnForm(),
            TextField::new('usrName','Name'),
            $password,
            TextField::new('usrMail','Email'),
            TextField::new('usrPicture','Avatar')->hideOnIndex(),
            BooleanField::new('usrHasagreed', 'Did agree'),
            DateTimeField::new('usrCreatedat','Created')->hideOnForm(),
            DateTimeField::new('usrUpdatedat', 'Last updated by user')->hideOnForm(),
        ];
    }

    public function updateEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        // set new password with encoder interface
        if (method_exists($entityInstance, 'setPassword') && !$this->get('request_stack')->getCurrentRequest()->isXmlHttpRequest()) {

            $clearPassword = trim($this->get('request_stack')->getCurrentRequest()->request->all()['User']['clearpassword']);

            ///MyLog::info("clearPass:" . $clearPassword);

            // save password only if is set a new clearpass
            if ( !empty($clearPassword) ) {
                ////MyLog::info("clearPass not empty! encoding password...");
                $encodedPassword = $this->passwordEncoder->encodePassword($this->getUser(), $clearPassword);
                $entityInstance->setPassword($encodedPassword);
            }
        }

        parent::updateEntity($entityManager, $entityInstance);
    }
}
