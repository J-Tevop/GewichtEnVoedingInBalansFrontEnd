import { DataSource } from 'typeorm'
import { Blog } from './entity/Blog'

require('dotenv').config()

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env['DB_HOST'],
  port: 3306,
  username: process.env['DB_USER'],
  password: process.env['DB_PASS'],
  database: process.env['DB_NAME'],
  logging: true,
  entities: [Blog],
  migrations: ['dist/**/*.migration.js'],
  //   entities: ['dist/**/*.entity.js'],
})
