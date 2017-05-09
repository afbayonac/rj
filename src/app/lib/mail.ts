import {createTransport} from 'nodemailer'
import {Types} from 'mongoose'
import {IVerify} from '../models/IUser'
import {randomBytes} from 'crypto'
import {cfg} from '../cfg/cfg'
import * as debug from 'debug'
const dbug = debug('rj:mail')

export class Mailman {
  public mail
  constructor () {
    this.mail = createTransport({
      host: 'mail.privateemail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'afbayonac@afbayonac.me',
        pass: '3TJQFFbx'
      }
    })
    // verify connection configuration
    this.mail.verify(function (error, success) {
      if (error) {
        dbug(error)
      } else {
        dbug('Server is ready to take our messages')
      }
    })
  }

  public sendVerifyEmail (email: string, username: string): IVerify {
    let code = randomBytes(Math.ceil(16)).toString('hex').slice(0, 16)
    let id = Types.ObjectId()
    this.mail.sendMail( {
      from: 'afbayonac@afbayonac.me',
      to: email,
      subject: 'RJ verify email',
      text: `
        rj

        Hola ${username}. Confirma tu correo con el siguiente enlace
        ${cfg.domain}/users/verify?code=${code}&&id=${id}

        Este mensaje ha genrado automaticamente por favor no responder
      `,
      html: `
        <h1> rj </h1>
        <p>
        Hola ${username}, Confirma tu correo
        <a href="${cfg.domain}/users/verify?code=${code}&&id=${id}">Aqui</a>
        </p>
        <p>Este mensaje ha genrado automaticamente por favor no responder.</p>
      `
    })
    return {
      code: code,
      //                                 sec   min  hour  day
      expiration: new Date(Date.now() + (1000 * 60 * 60 * 24 * 2)),
      _id: id
    }
  }
}
