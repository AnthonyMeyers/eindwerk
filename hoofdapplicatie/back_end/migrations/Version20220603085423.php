<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220603085423 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE todo ADD tdo_usr_id INT NOT NULL, ADD tdo_pty_id INT NOT NULL, ADD tdo_cty_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE todo ADD CONSTRAINT FK_5A0EB6A07C5AC42D FOREIGN KEY (tdo_usr_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE todo ADD CONSTRAINT FK_5A0EB6A049B60E8F FOREIGN KEY (tdo_pty_id) REFERENCES priority (id)');
        $this->addSql('ALTER TABLE todo ADD CONSTRAINT FK_5A0EB6A0CCF47EBA FOREIGN KEY (tdo_cty_id) REFERENCES category (id)');
        $this->addSql('CREATE INDEX IDX_5A0EB6A07C5AC42D ON todo (tdo_usr_id)');
        $this->addSql('CREATE INDEX IDX_5A0EB6A049B60E8F ON todo (tdo_pty_id)');
        $this->addSql('CREATE INDEX IDX_5A0EB6A0CCF47EBA ON todo (tdo_cty_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE todo DROP FOREIGN KEY FK_5A0EB6A07C5AC42D');
        $this->addSql('ALTER TABLE todo DROP FOREIGN KEY FK_5A0EB6A049B60E8F');
        $this->addSql('ALTER TABLE todo DROP FOREIGN KEY FK_5A0EB6A0CCF47EBA');
        $this->addSql('DROP INDEX IDX_5A0EB6A07C5AC42D ON todo');
        $this->addSql('DROP INDEX IDX_5A0EB6A049B60E8F ON todo');
        $this->addSql('DROP INDEX IDX_5A0EB6A0CCF47EBA ON todo');
        $this->addSql('ALTER TABLE todo DROP tdo_usr_id, DROP tdo_pty_id, DROP tdo_cty_id');
    }
}
