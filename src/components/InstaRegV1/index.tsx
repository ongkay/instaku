'use client'

import { Button, CopyButton } from '@mantine/core'
import { useEffect, useState } from 'react'
import {
  IconArrowsShuffle,
  IconHome,
  IconMicroscope,
  IconUserCheck,
  IconUserCircle,
} from '@tabler/icons-react'
import { getRandomUser } from '@/src/lib/getRandomUser'
import { Otpnya } from './Otpnya'
import { Totp } from './Totp'
import { useSearchParams, useRouter } from 'next/navigation'
import useSetParams from '@/src/hook/useSetParams'
import { IconRefresh } from '@tabler/icons-react'
import { IconCopy } from '@tabler/icons-react'

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
      <div className="flex flex-col items-center justify-center w-full gap-3 px-5 m-5 mx-auto xl:w-1/3">
        <div className="flex items-center justify-center w-full gap-1">
          <Button
            variant="default"
            size="xs"
            leftSection={<IconHome size={16} />}
            fullWidth
            onClick={() => {
              router.replace('/')
              setTimeout(() => {
                location.reload()
              }, 300)
            }}
          >
            Home
          </Button>
          <Button
            variant="default"
            size="xs"
            leftSection={<IconRefresh size={16} />}
            fullWidth
            onClick={() => {
              location.reload()
            }}
          >
            Reload
          </Button>
          <Button
            variant="default"
            size="xs"
            leftSection={<IconArrowsShuffle size={16} />}
            fullWidth
            onClick={randomKlikHandler}
          >
            Radom data
          </Button>
          <CopyButton value={window.location.href || 'link belum siap'}>
            {({ copied, copy }) => (
              <Button
                leftSection={<IconCopy size={16} />}
                size="xs"
                fullWidth
                color={copied ? 'teal' : 'gray'}
                onClick={copy}
              >
                {copied ? 'mengkopi link' : 'copy url'}
              </Button>
            )}
          </CopyButton>
        </div>

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
    </>
  )
}
