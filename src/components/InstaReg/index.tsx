'use client'

import { Button, CopyButton, Input } from '@mantine/core'
import { useEffect, useState } from 'react'
import {
  IconArrowsShuffle,
  IconHome,
  IconMicroscope,
  IconUserCheck,
  IconUserCircle,
  IconCopy,
  IconAt,
  IconUser,
  IconLink,
  IconLock,
} from '@tabler/icons-react'
import { getRandomUser } from '@/src/lib/getRandomUser'
import { Otpnya } from './Otpnya'
import { Totp } from './Totp'
import { useSearchParams, useRouter } from 'next/navigation'
import useSetParams from '@/src/hook/useSetParams'
import { IconRefresh } from '@tabler/icons-react'
import InputCopy from './InputCopy'
// import { IconCopy } from '@tabler/icons-react'

export function InstaReg() {
  const router = useRouter()
  const searchParams: any = useSearchParams()
  const { urlParams, setParams } = useSetParams()
  const [dataUser, setdataUser] = useState({
    username: '',
    fullName: '',
    bio: '',
    password: '',
  })
  const [myDomain, setMyDomain] = useState('')

  const randomKlikHandler = () => {
    if (urlParams.length > 1) router.push('/')

    const getUserData = getRandomUser()
    setdataUser(getUserData)
  }

  useEffect(() => {
    const getUserData = getRandomUser()

    const fullName = searchParams.get('fullName') || getUserData.fullName
    const username = searchParams.get('username') || getUserData.username
    const password = searchParams.get('pw') || getUserData.password

    console.log(fullName)

    setMyDomain(window.location.host)

    fullName
      ? setdataUser({ bio: getUserData.bio, fullName, username, password })
      : setdataUser(getUserData)
  }, [])

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full gap-3 px-5 m-5 mx-auto xl:w-1/3">
        <div className="flex items-center justify-center w-full gap-1">
          <Button
            variant="light"
            color=""
            size="xs"
            leftSection={<IconHome size={16} />}
            fullWidth
            onClick={() => {
              router.replace('/')
              setTimeout(() => {
                location.reload()
              }, 600)
            }}
          >
            Home
          </Button>
          <Button
            variant="light"
            size="xs"
            leftSection={<IconRefresh size={16} />}
            fullWidth
            onClick={() => {
              location.reload()
            }}
          >
            Reload
          </Button>
        </div>
        <CopyButton value={myDomain + urlParams}>
          {({ copied, copy }) => (
            <Button
              fullWidth
              variant="light"
              leftSection={<IconLink size={18} />}
              color={copied ? 'teal' : 'blue'}
              onClick={copy}
            >
              {copied ? 'mengkopi url' : 'copy URL'}
            </Button>
          )}
        </CopyButton>

        <Totp />
        <Otpnya />
        <Button
          variant="filled"
          color="grape"
          leftSection={<IconArrowsShuffle size={16} />}
          fullWidth
          onClick={randomKlikHandler}
        >
          Radom data
        </Button>

        <InputCopy
          name="Name"
          value={dataUser.fullName}
          actions={() => {
            setParams('fullName', dataUser.fullName)
          }}
          icon={<IconUser size={18} />}
        />

        <InputCopy
          name="User"
          value={dataUser.username}
          actions={() => {
            setParams('username', dataUser.username)
          }}
          icon={<IconAt size={18} />}
        />

        <InputCopy
          name="Password"
          value={dataUser.password}
          actions={() => {
            setParams('pw', dataUser.password)
          }}
          icon={<IconLock size={18} />}
        />

        <InputCopy name="Bio" value={dataUser.bio} icon={<IconMicroscope size={18} />} />

        {/* <>
          {getLink ? (
            <InputCopy
              name="url"
              value={myDomain + urlParams}
              icon={<IconLink size={18} />}
            />
          ) : (
            <Button
              variant="light"
              size="xs"
              leftSection={<IconLink size={16} />}
              fullWidth
              onClick={() => {
                setMyDomain(window.location.host)
                setGetLink(true)
              }}
            >
              Get url
            </Button>
          )}
        </> */}
      </div>
    </>
  )
}
