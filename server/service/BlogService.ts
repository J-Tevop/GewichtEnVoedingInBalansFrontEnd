import { Blog } from '../entity/Blog'
import { AppDataSource } from '../DataSource'
import { validate } from 'class-validator'

require('dotenv').config()

export class BlogService {
  private blogRepository = AppDataSource.getRepository(Blog)

  async createBlog(blogData: Blog): Promise<Blog> {
    const blog = this.blogRepository.create(blogData)
    const errors = await validate(blog)

    if (errors.length > 0) {
      const errorMessages = errors
        .map(error => Object.values(error.constraints || {}))
        .join(', ')
      throw new Error(errorMessages)
    } else {
      try {
        await this.blogRepository.save(blog)

        return blog
      } catch (error) {
        console.error('Error while creating blog:', error)
        throw error
      }
    }
  }

  async getBlogById(id: string): Promise<Blog | null> {
    const blog = await this.blogRepository.findOne({
      where: { id: parseInt(id) },
    })

    if (!blog) {
      console.log('Blog not found')
      throw new Error('Blog not found')
    }

    try {
      return blog
    } catch (error) {
      console.error('Error while finding blog:', error)
      throw error
    }
  }

  async getAllBlogs(): Promise<Blog[] | null> {
    const blogs = await this.blogRepository.find()

    if (!blogs) {
      console.log('Blog not found')
      throw new Error('Blog not found')
    }
    try {
      return blogs
    } catch (error) {
      console.error('Error while finding blogs:', error)
      throw error
    }
  }

  async updateBlog(id: string, blogData: Blog): Promise<Blog | null> {
    const blog = await this.blogRepository.findOne({
      where: { id: parseInt(id) },
    })

    if (!blog) {
      throw new Error('Blog not found')
    }

    blog.title = blogData.title
    blog.body = blogData.body
    blog.summary = blogData.summary
    blog.updated_at = new Date()

    return this.blogRepository.save(blog)
  }

  async deleteBlog(id: string): Promise<void> {
    const blog = await this.blogRepository.findOne({
      where: { id: parseInt(id) },
    })

    if (!blog) {
      throw new Error('Blog not found')
    }

    try {
      await this.blogRepository.remove(blog)
    } catch (error) {
      console.error('Error while deleting blog:', error)
      throw error
    }
  }
}
