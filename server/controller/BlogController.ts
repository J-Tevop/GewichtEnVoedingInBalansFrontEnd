import express, { Request, Response } from 'express'
import { BlogService } from '../service/BlogService'

const router = express.Router()
const blogService = new BlogService()

router.use(express.json())

// Create blog
router.post('/blog', async (req: Request, res: Response) => {
  const blog = await blogService.createBlog(req.body)
  res.status(201).json(blog)
})

// Read blog
router.get('/blog/:id', async (req: Request, res: Response) => {
  const blog = await blogService.getBlog(req.params['id'])
  res.json(blog)
})

// Update blog
router.put('/blog/:id', async (req: Request, res: Response) => {
  const updatedBlog = await blogService.updateBlog(req.params['id'], req.body)
  res.json(updatedBlog)
})

// Delete blog
router.delete('/blog/:id', async (req: Request, res: Response) => {
  await blogService.deleteBlog(req.params['id'])
  res.status(204).send()
})

export { router as BlogController }
