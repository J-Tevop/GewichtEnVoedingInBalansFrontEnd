// Assuming you have a Blog model

import { getRepository } from 'typeorm'
import { Blog } from '../entity/Blog'
import { createConnection } from 'net'
import { connect } from 'http2'
import { get } from 'http'
import { AppDataSource } from '../DataSource'
// import { dbConnection } from '../../server'

require('dotenv').config()

export class BlogService {
  private blogRepository = AppDataSource.getRepository(Blog)

  constructor() {}

  async createBlog(blogData: Blog): Promise<Blog> {
    // Implement your logic to create a blog here
    // For example, with TypeORM you might do:
    // return getRepository(Blog).save(blogData);
    return this.blogRepository.save(blogData)
  }

  async getBlog(id: string): Promise<Blog | null> {
    // Implement your logic to get a blog by ID here
    // For example, with TypeORM you might do:
    // return getRepository(Blog).findOne(id);
    return this.blogRepository.findOne({ where: { id: parseInt(id) } })
  }

  async updateBlog(id: string, blogData: Blog): Promise<Blog | null> {
    // Implement your logic to update a blog here
    // For example, with TypeORM you might do:
    // await getRepository(Blog).update(id, blogData);
    // return getRepository(Blog).findOne(id);

    return this.blogRepository.save(blogData)
  }

  async deleteBlog(id: string): Promise<void> {
    // Implement your logic to delete a blog here
    // For example, with TypeORM you might do:
    // await getRepository(Blog).delete(id);
  }
}
