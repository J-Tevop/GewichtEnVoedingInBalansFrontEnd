import express, { Request, Response } from 'express'
import { BlogService } from '../service/BlogService'

const router = express.Router()
const blogService = new BlogService()

router.use(express.json())

// Create blog
router.post('/api/blog', async (req: Request, res: Response) => {
  try {
    const blog = await blogService.createBlog(req.body)
    res.status(201).json(blog)
  } catch (error) {
    let errorMessage = 'An error occurred'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    res.status(500).send({ message: errorMessage })
  }
})

// Read blog
router.get('/api/blog/:id', async (req: Request, res: Response) => {
  try {
    const blog = await blogService.getBlogById(req.params['id'])
    res.status(200).json(blog)
  } catch (error) {
    let errorMessage = 'An error occurred'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    res.status(500).send({ message: errorMessage })
  }
})

router.get('/api/blog', async (req: Request, res: Response) => {
  try {
    const blogs = await blogService.getAllBlogs()
    res.status(200).json(blogs)
  } catch (error) {
    let errorMessage = 'An error occurred'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    res.status(500).send({ message: errorMessage })
  }
})

// Update blog
router.put('/api/blog/:id', async (req: Request, res: Response) => {
  const updatedBlog = await blogService.updateBlog(req.params['id'], req.body)
  res.json(updatedBlog)
})

// Delete blog
router.delete('/api/blog/:id', async (req: Request, res: Response) => {
  try {
    await blogService.deleteBlog(req.params['id'])
    res.status(204).send('Blog deleted successfully!')
  } catch (error) {
    let errorMessage = 'An error occurred'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    res.status(500).send({ message: errorMessage })
  }
})

export { router as BlogController }
