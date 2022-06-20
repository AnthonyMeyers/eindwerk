<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220620145811 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE contact CHANGE cty_createdat cnt_createdat DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', CHANGE cty_updatedat cnt_updatedat DATETIME DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE contact CHANGE cnt_createdat cty_createdat DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', CHANGE cnt_updatedat cty_updatedat DATETIME DEFAULT NULL');
    }
}
