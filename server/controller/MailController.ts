import { app } from '../../server'
import express from 'express'
import { MailService } from '../service/MailService'

const router = express.Router()
const mailService = new MailService()

router.use(express.json())

router.post('/api/sendMail', async (req, res) => {
  try {
    const { name, email, address, telephoneNumber, message, postalCode } =
      req.body
    mailService.sendMail(
      name,
      email,
      address,
      postalCode,
      telephoneNumber,
      message,
    )
    res.status(200).send({ message: 'Email sent' })
  } catch (error) {
    let errorMessage = 'An error occurred'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    res.status(500).send({ message: errorMessage })
  }
})

export { router as MailController }
