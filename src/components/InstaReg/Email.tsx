'use client'
import { Button, CopyButton, Input, Loader, Paper, Text, Title } from '@mantine/core'
import { useEffect, useState, useTransition } from 'react'
import {
  Icon2fa,
  IconArrowsVertical,
  IconKey,
  IconLink,
  IconLockOpen,
  IconMail,
  IconNumber,
  IconPhonePlus,
  IconSend,
  IconZoomReset,
} from '@tabler/icons-react'
import { useForm } from '@mantine/form'
import getTotp from '@/src/lib/TotpGenerator'
import useSetParams from '@/src/hook/useSetParams'
import { useSearchParams } from 'next/navigation'
import InputCopy from './InputCopy'
import { getEmailAction } from './_actions'
import { sleep } from '@/src/lib/utils'

export function Email() {
  let [pending, startTransition] = useTransition()
  const [dataMail, setDataMail] = useState({
    email: 'ongkaysetiawan@outlook.com',
    password: 'Satuduatiga456',
  })
  const searchParams: any = useSearchParams()
  const { setParams } = useSetParams()
  const [show, setShow] = useState(false)
  const [choice, setChoice] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [resValue, setResValue] = useState<string>('')

  const actionHandler = async (opsi: 'getOTP' | 'getLinkConfirm' | 'getLinkReset') => {
    setChoice(true)
    startTransition(async () => {
      console.log('siap runing')
      const datanya = await getEmailAction(dataMail.email, dataMail.password, opsi)
      console.log(datanya)
      console.log('await done')

      if (datanya) {
        setResult(datanya)
        setResValue(datanya)
      }
    })
  }

  const getNewEmailHandler = async () => {
    startTransition(async () => {
      // const res = await newOrderOTP()
      await sleep(1000) //  ganti get email dr db
      setShow(true)
      // setParams('email', res.email)
      // setParams('passmail', res?.passmail)
      // setDataMail({ email: res.mail, password: res.password })
    })
  }

  // useEffect(() => {
  //   const email = searchParams.get('email')
  //   const passmail = searchParams.get('passmail')
  //   const resMail = searchParams.get('resMail')
  //   if (email) {
  //     // setDataMail({ email: res.mail, password: res.password })
  //     setShow(true)
  //     resMail ? setResult(resMail) : null
  //   }
  // }, [])

  return (
    <>
      {!show ? (
        <>
          <Button
            loading={pending}
            color="indigo"
            fullWidth
            justify="space-between"
            leftSection={<IconMail size={18} />}
            rightSection={<span />}
            onClick={getNewEmailHandler}
          >
            Minta Email Fress
          </Button>
        </>
      ) : (
        <>
          <InputCopy name="Hape" value={dataMail.email} icon={<IconMail size={18} />} />

          {!choice ? (
            <>
              <div className="flex items-center justify-center w-full gap-1 mb-7">
                <Button
                  color="yellow"
                  size="xs"
                  leftSection={<IconKey size={16} />}
                  fullWidth
                  onClick={async () => {
                    await actionHandler('getOTP')
                  }}
                >
                  OTP
                </Button>
                <Button
                  color="yellow"
                  size="xs"
                  leftSection={<IconLink size={16} />}
                  fullWidth
                  onClick={async () => {
                    await actionHandler('getLinkConfirm')
                  }}
                >
                  Link
                </Button>
                <Button
                  color="yellow"
                  size="xs"
                  leftSection={<IconLockOpen size={16} />}
                  fullWidth
                  onClick={async () => {
                    await actionHandler('getLinkReset')
                  }}
                >
                  ResetPW
                </Button>
              </div>
            </>
          ) : (
            <>
              {pending ? (
                <>
                  <Loader color="pink" />
                  <Text ta={'center'}>Memeriksa Email Masuk...</Text>
                </>
              ) : (
                <InputCopy
                  name="Result"
                  value={resValue}
                  icon={<IconArrowsVertical size={18} />}
                />
              )}
            </>
          )}
        </>
      )}
    </>
  )
}
