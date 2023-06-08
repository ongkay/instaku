'use client'

import { Button, CopyButton, Stack } from '@mantine/core'
import { useCallback, useEffect, useState } from 'react'
import { IconMicroscope, IconUserCheck, IconUserCircle } from '@tabler/icons-react'
import { getRandomUser } from '@/src/lib/getRandomUser'
import { Otpnya } from './Otpnya'
import { Totp } from './Totp'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import useSetParams from '@/src/hook/useSetParams'

export function InstaReg() {
  const router = useRouter()
  const searchParams: any = useSearchParams()
  const { urlParams, setParams } = useSetParams()
  const [dataUser, setdataUser] = useState({
    username: '...',
    fullName: '...',
    bio: '...',
  })

  const randomKlikHandler = () => {
    if (urlParams.length > 1) router.push('/')

    const getUserData = getRandomUser()
    setdataUser(getUserData)
  }

  useEffect(() => {
    const fullName = searchParams.get('fullName')
    const username = searchParams.get('username')
    const getUserData = getRandomUser()

    fullName
      ? setdataUser({ bio: getUserData.bio, fullName, username })
      : setdataUser(getUserData)
  }, [])

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full gap-4 px-5 m-5 mx-auto xl:w-1/3 debuger">
        <Button variant="default" fullWidth onClick={randomKlikHandler}>
          Radom data
        </Button>

        <CopyButton value={dataUser?.fullName}>
          {({ copied, copy }) => (
            <Button
              size="md"
              fullWidth
              justify="space-between"
              leftSection={<IconUserCircle size={18} />}
              rightSection={<span />}
              color={copied ? 'teal' : 'blue'}
              onClick={() => {
                copy()
                setParams('fullName', dataUser?.fullName)
              }}
            >
              {copied ? 'mengkopi nama lengkap' : `${dataUser?.fullName}`}
            </Button>
          )}
        </CopyButton>

        <CopyButton value={dataUser.username}>
          {({ copied, copy }) => (
            <Button
              size="md"
              fullWidth
              justify="space-between"
              leftSection={<IconUserCheck size={18} />}
              rightSection={<span />}
              color={copied ? 'teal' : 'blue'}
              onClick={() => {
                copy()
                setParams('username', dataUser.username)
              }}
            >
              {copied ? 'mengkopi username' : `${dataUser.username}`}
            </Button>
          )}
        </CopyButton>

        <CopyButton value={dataUser.bio}>
          {({ copied, copy }) => (
            <Button
              size="md"
              fullWidth
              justify="space-between"
              leftSection={<IconMicroscope size={18} />}
              rightSection={<span />}
              color={copied ? 'teal' : 'blue'}
              onClick={copy}
            >
              {copied ? 'mengkopi bio' : `${dataUser.bio}`}
            </Button>
          )}
        </CopyButton>

        <Otpnya />
        <Totp />
      </div>

      {/* <div className="px-5 m-5 mx-auto xl:w-1/3">
        <CopyButton value={window.location.href}>
          {({ copied, copy }) => (
            <Button size="md" color={copied ? 'teal' : 'gray'} onClick={copy}>
              {copied ? 'mengkopi link' : 'copy link url'}
            </Button>
          )}
        </CopyButton>
      </div> */}
    </>
  )
}
