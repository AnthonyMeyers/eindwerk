<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220618115124 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE contact DROP FOREIGN KEY FK_4C62E63876D40A4E');
        $this->addSql('DROP INDEX IDX_4C62E63876D40A4E ON contact');
        $this->addSql('ALTER TABLE contact CHANGE cnt_user_id cnt_usr_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE contact ADD CONSTRAINT FK_4C62E638DD7F95F FOREIGN KEY (cnt_usr_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_4C62E638DD7F95F ON contact (cnt_usr_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE contact DROP FOREIGN KEY FK_4C62E638DD7F95F');
        $this->addSql('DROP INDEX IDX_4C62E638DD7F95F ON contact');
        $this->addSql('ALTER TABLE contact CHANGE cnt_usr_id cnt_user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE contact ADD CONSTRAINT FK_4C62E63876D40A4E FOREIGN KEY (cnt_user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_4C62E63876D40A4E ON contact (cnt_user_id)');
    }
}
