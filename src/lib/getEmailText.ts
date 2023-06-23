import { sleep } from "./utils"


// @ts-ignore
const imaps = require('imap-simple2')
const simpleParser = require('mailparser').simpleParser
const _ = require('lodash')

const RegReset =
  /(https:\/\/instagram\.com\/accounts\/password)(\([-a-zA-Z0-9+&@#\/%=~_|$?!:;,.]*\)|[-a-zA-Z0-9+&@#\/%=~_|$?!:;,.])*(\([-a-zA-Z0-9+&@#\/%=~_|$?!:,.]*\)|[a-zA-Z0-9+&@#\/%=~_|$])/gm
const RegConfirm =
  /(?:https:\/\/instagram\.com\/accounts\/confirm)(?:\([-a-zA-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-a-zA-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-a-zA-Z0-9+&@#\/%=~_|$?!:,.]*\)|[a-zA-Z0-9+&@#\/%=~_|$])/gm
const RegOTP = /(?<=>)([0-9]{6})/gm

export const getEmailText = async (email: string, passmail: string,) => {
  let Result = {
    idHeader: '',
    body: '',
    mailFrom: ''
  }

  let isMailru =
    email.includes('@mail.ru') ||
    email.includes('@inbox.ru') ||
    email.includes('@list.ru') ||
    email.includes('@bk.ru')

  let isOutlook = email.includes('@outlook.com') || email.includes('@hotmail.com')

  let hostnya = isMailru
    ? 'imap.mail.ru'
    : isOutlook
      ? 'outlook.office365.com'
      : undefined

  console.log({ hostnya })

  if (!hostnya) {
    console.log('Email host terdeteksi bukan mailru atau outlook')
    return null
  } else {
    const config = {
      imap: {
        user: email,
        password: passmail,
        host: hostnya,
        port: 993,
        tls: true,
        authTimeout: 30000,
      },
    }


    return imaps.connect(config).then(function (connection: any) {
      console.log('connection')

      return connection.openBox('INBOX').then(function () {
        const searchCriteria = ['1:5']
        const fetchOptions = {
          bodies: ['HEADER', 'TEXT', ''],
        }
        return connection.search(searchCriteria, fetchOptions).then(function (messages: any) {
          messages.forEach(function (item: any) {
            // akan foreacth dari yg lama hingga terbaru yg terakhir
            const all = _.find(item.parts, { which: '' })
            const id = item.attributes.uid
            const idHeader = 'Imap-Id: ' + id + '\r\n'
            const tgl = item.attributes.date //  new Date('2023-06-18T00:42:24.000Z')
            const header = _.find(item.parts, { which: 'HEADER' })
            const mailSubject = header.body.subject
            const mailFrom = header.body.from
            const html = (Buffer.from(all.body, 'base64').toString('ascii'));


            if (mailFrom[0].includes('Team')) {
              console.log(Date().toString() + " : --> Email Massage Found")
              // console.log(mailFrom)

              Result = {
                idHeader,
                body: all.body,
                mailFrom
              }
            }

            connection.end()

          })

          return Result
        })
      })
    })
  }
}
