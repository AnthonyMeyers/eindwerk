<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220607165616 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE appointment (id INT AUTO_INCREMENT NOT NULL, apm_usr_id INT NOT NULL, apm_title VARCHAR(100) NOT NULL, apm_description VARCHAR(255) DEFAULT NULL, apm_created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', apm_updated_at DATETIME DEFAULT NULL, apm_starts_at DATETIME NOT NULL, apm_stops_at DATETIME DEFAULT NULL, INDEX IDX_FE38F844ED49A81 (apm_usr_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE category (id INT AUTO_INCREMENT NOT NULL, cty_title VARCHAR(100) NOT NULL, cty_class VARCHAR(100) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE priority (id INT AUTO_INCREMENT NOT NULL, pty_rating SMALLINT NOT NULL, pty_title VARCHAR(100) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE todo (id INT AUTO_INCREMENT NOT NULL, tdo_usr_id INT NOT NULL, tdo_pty_id INT NOT NULL, tdo_cty_id INT NOT NULL, tdo_title VARCHAR(150) NOT NULL, tdo_description VARCHAR(255) DEFAULT NULL, tdo_is_done TINYINT(1) NOT NULL, tdo_created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', tdo_updated_at DATETIME DEFAULT NULL, INDEX IDX_5A0EB6A07C5AC42D (tdo_usr_id), INDEX IDX_5A0EB6A049B60E8F (tdo_pty_id), INDEX IDX_5A0EB6A0CCF47EBA (tdo_cty_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(180) NOT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, usr_mail VARCHAR(255) NOT NULL, usr_created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', usr_updated_at DATETIME DEFAULT NULL, usr_picture VARCHAR(255) DEFAULT NULL, usr_has_agreed TINYINT(1) NOT NULL, is_verified TINYINT(1) NOT NULL, UNIQUE INDEX UNIQ_8D93D649D0D90DAF (usr_mail), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE appointment ADD CONSTRAINT FK_FE38F844ED49A81 FOREIGN KEY (apm_usr_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE todo ADD CONSTRAINT FK_5A0EB6A07C5AC42D FOREIGN KEY (tdo_usr_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE todo ADD CONSTRAINT FK_5A0EB6A049B60E8F FOREIGN KEY (tdo_pty_id) REFERENCES priority (id)');
        $this->addSql('ALTER TABLE todo ADD CONSTRAINT FK_5A0EB6A0CCF47EBA FOREIGN KEY (tdo_cty_id) REFERENCES category (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE todo DROP FOREIGN KEY FK_5A0EB6A0CCF47EBA');
        $this->addSql('ALTER TABLE todo DROP FOREIGN KEY FK_5A0EB6A049B60E8F');
        $this->addSql('ALTER TABLE appointment DROP FOREIGN KEY FK_FE38F844ED49A81');
        $this->addSql('ALTER TABLE todo DROP FOREIGN KEY FK_5A0EB6A07C5AC42D');
        $this->addSql('DROP TABLE appointment');
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE priority');
        $this->addSql('DROP TABLE todo');
        $this->addSql('DROP TABLE user');
    }
}
