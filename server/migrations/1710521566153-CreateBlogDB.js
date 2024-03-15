const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class CreateBlogDB21710521566153 {
  name = 'CreateBlogDB21710521566153'

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE blogs (
    ID INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    summary TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (ID)
);`,
    )
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_b73513a1d14c8f2908be932becc\``,
    )
    await queryRunner.query(`ALTER TABLE \`blogs\` DROP COLUMN \`updated_at\``)
    await queryRunner.query(
      `ALTER TABLE \`blogs\` ADD \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`,
    )
    await queryRunner.query(
      `ALTER TABLE \`blogs\` CHANGE \`created_at\` \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`,
    )
    await queryRunner.query(`ALTER TABLE \`blogs\` DROP COLUMN \`summary\``)
    await queryRunner.query(
      `ALTER TABLE \`blogs\` ADD \`summary\` text NOT NULL`,
    )
    await queryRunner.query(`ALTER TABLE \`blogs\` DROP COLUMN \`body\``)
    await queryRunner.query(`ALTER TABLE \`blogs\` ADD \`body\` text NOT NULL`)
    await queryRunner.query(`DROP TABLE \`images\``)
  }
}
