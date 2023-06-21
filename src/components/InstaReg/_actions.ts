'use server'

import { getMailku } from "@/src/lib/getMailKu"

// import { revalidatePath } from 'next/cache'


export async function getEmailAction(email: string, passmail: string, opsi: "getOTP" | "getLinkConfirm" | "getLinkReset") {
  const resMail = await getMailku(
    email,
    passmail,
    opsi
  ) as string | null

  console.log("resMail")
  console.log(resMail)

  return resMail
  // await new Promise((resolve) => setTimeout(resolve, 7000));

  // revalidatePath('/')
  // return formData

}