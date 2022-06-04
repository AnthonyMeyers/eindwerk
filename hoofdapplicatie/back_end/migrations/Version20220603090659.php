<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220603090659 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE priority ADD pty_title VARCHAR(100) NOT NULL');
        $this->addSql('ALTER TABLE todo CHANGE tdo_cty_id tdo_cty_id INT NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE priority DROP pty_title');
        $this->addSql('ALTER TABLE todo CHANGE tdo_cty_id tdo_cty_id INT DEFAULT NULL');
    }
}
