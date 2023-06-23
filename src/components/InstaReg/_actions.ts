'use server'

import { getEmailText } from "@/src/lib/getEmailText"
const simpleParser = require('mailparser').simpleParser

const RegReset =
  /(https:\/\/instagram\.com\/accounts\/password)(\([-a-zA-Z0-9+&@#\/%=~_|$?!:;,.]*\)|[-a-zA-Z0-9+&@#\/%=~_|$?!:;,.])*(\([-a-zA-Z0-9+&@#\/%=~_|$?!:,.]*\)|[a-zA-Z0-9+&@#\/%=~_|$])/gm
const RegConfirm =
  /(?:https:\/\/instagram\.com\/accounts\/confirm)(?:\([-a-zA-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-a-zA-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-a-zA-Z0-9+&@#\/%=~_|$?!:,.]*\)|[a-zA-Z0-9+&@#\/%=~_|$])/gm
const RegOTP = /(?<=>)([0-9]{6})/gm

export async function getEmailAction(email: string, passmail: string, opsi: "getOTP" | "getLinkConfirm" | "getLinkReset") {
  const dataMail = await getEmailText(
    email,
    passmail,
  ) as {
    idHeader: string
    body: string,
    mailFrom: string
  }

  return '123456'

  // console.log("dataMail")
  // console.log(dataMail)

  // let Result: null | string = null
  // const mail = await simpleParser(dataMail.idHeader + dataMail.body)
  // console.log("masuk parser")
  // console.log(mail.subject)
  // console.log(mail.from.text)
  // // console.log(mail.html)
  // let resMail = mail.html
  // switch (opsi) {
  //   case 'getOTP':
  //     // Result = resMail.match(RegOTP)
  //     Result = '456456'
  //     console.log('Kode OTP = ' + Result)
  //     return Result

  //   case 'getLinkConfirm':
  //     let res = resMail.match(RegConfirm)
  //     Result = res ? res[0] : null
  //     console.log('Link konfirmasinya = ' + Result)
  //     return Result

  //   case 'getLinkReset':
  //     let res2 = resMail.match(RegReset)
  //     Result = res2 ? res2[0] : null
  //     console.log('Link reset password = ' + Result)
  //     return Result

  //   default:
  //     console.error('opsi tidak terpilih')
  //     return Result = null
  // }







  // await new Promise((resolve) => setTimeout(resolve, 7000));

  // revalidatePath('/')
  // return formData

}