import e from 'express'
import { google } from 'googleapis'
import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { resolve } from 'path'
import { Mail } from '../../src/app/types/mail'
import { CreateMail } from '../types/Mail'
require('dotenv').config()

export class MailService {
  createTransporter = async () => {
    try {
      const oauth2Client = new google.auth.OAuth2(
        process.env['CLIENT_ID'],
        process.env['CLIENT_SECRET'],
        'https://developers.google.com/oauthplayground',
      )

      oauth2Client.setCredentials({
        refresh_token: process.env['REFRESH_TOKEN'],
      })

      const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
          if (err) {
            console.log('*ERR: ', err)
            reject()
          }
          resolve(token)
        })
      })

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env['USER_EMAIL'],
          accessToken,
          clientId: process.env['CLIENT_ID'],
          clientSecret: process.env['CLIENT_SECRET'],
          refreshToken: process.env['REFRESH_TOKEN'],
        },
      } as SMTPTransport.Options)
      return transporter
    } catch (err) {
      return err
    }
  }

  sendMail = async (
    name: CreateMail['name'],
    email: CreateMail['email'],
    address: CreateMail['address'],
    postalCode: CreateMail['postalCode'],
    telephoneNumber: CreateMail['telephoneNumber'],
    message: CreateMail['message'],
  ) => {
    try {
      const mailOptions = {
        from: process.env['USER_EMAIL'],
        to: process.env['RECIPIENT_EMAIL'],
        subject: 'Contact form submission',
        html: `<h3>Naam: ${name}</h3> <br> <h4>Email: ${email} </h4> <h4>Adres: ${address} </h4> <h4>Postcode: ${postalCode} </h4> <h4>Telefoonnummer: ${telephoneNumber} </h4> <br> <p>${message}</p>`,
      }

      let emailTransporter = await this.createTransporter()
      await (emailTransporter as nodemailer.Transporter<unknown>).sendMail(
        mailOptions,
      )
      console.log('Email sent')
    } catch (err) {
      console.log('ERROR: ', err)
      console.log('An error occurred')
    }
  }
}
