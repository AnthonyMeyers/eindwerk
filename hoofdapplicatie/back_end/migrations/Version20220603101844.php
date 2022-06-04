<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220603101844 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user ADD username VARCHAR(180) NOT NULL, ADD roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', ADD password VARCHAR(255) NOT NULL, DROP usr_name, DROP usr_mail, DROP usr_password, DROP usr_created_at, DROP usr_updated_at, DROP usr_picture, DROP usr_has_agreed');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649F85E0677 ON user (username)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX UNIQ_8D93D649F85E0677 ON user');
        $this->addSql('ALTER TABLE user ADD usr_name VARCHAR(25) NOT NULL, ADD usr_password VARCHAR(255) NOT NULL, ADD usr_created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', ADD usr_updated_at DATETIME DEFAULT NULL, ADD usr_picture VARCHAR(255) DEFAULT NULL, ADD usr_has_agreed TINYINT(1) NOT NULL, DROP username, DROP roles, CHANGE password usr_mail VARCHAR(255) NOT NULL');
    }
}
