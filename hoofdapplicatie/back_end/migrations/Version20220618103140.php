<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220618103140 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE todo CHANGE tdo_created_at tdo_createdat DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', CHANGE tdo_updated_at tdo_updatedat DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE user CHANGE usr_created_at usr_createdat DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', CHANGE usr_updated_at usr_updatedat DATETIME DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE todo CHANGE tdo_createdat tdo_created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', CHANGE tdo_updatedat tdo_updated_at DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE user CHANGE usr_createdat usr_created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', CHANGE usr_updatedat usr_updated_at DATETIME DEFAULT NULL');
    }
}
