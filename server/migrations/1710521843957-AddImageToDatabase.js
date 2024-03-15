const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class AddImageToDatabase1710521843957 {
    name = 'AddImageToDatabase1710521843957'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`images\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, \`blogId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`blogs\` DROP COLUMN \`body\``);
        await queryRunner.query(`ALTER TABLE \`blogs\` ADD \`body\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`blogs\` DROP COLUMN \`summary\``);
        await queryRunner.query(`ALTER TABLE \`blogs\` ADD \`summary\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`created_at\` \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`blogs\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`blogs\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_b73513a1d14c8f2908be932becc\` FOREIGN KEY (\`blogId\`) REFERENCES \`blogs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_b73513a1d14c8f2908be932becc\``);
        await queryRunner.query(`ALTER TABLE \`blogs\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`blogs\` ADD \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`created_at\` \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`blogs\` DROP COLUMN \`summary\``);
        await queryRunner.query(`ALTER TABLE \`blogs\` ADD \`summary\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`blogs\` DROP COLUMN \`body\``);
        await queryRunner.query(`ALTER TABLE \`blogs\` ADD \`body\` text NOT NULL`);
        await queryRunner.query(`DROP TABLE \`images\``);
    }
}
