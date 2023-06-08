'use client'

import { Button, CopyButton, Stack } from '@mantine/core'
import { useEffect, useState } from 'react'
import { IconPhoto, IconUserCheck, IconUserCircle } from '@tabler/icons-react'
import { getRandomUser } from '@/src/lib/getRandomUser'
import { Otpnya } from './Otpnya'

export function InstaReg() {
  const [loading, setLoading] = useState(true)
  const [dataUser, setdataUser] = useState({
    firstName: '...',
    lastName: '...',
    username: '...',
    fullName: '...',
  })
  const [getOTP, setGetOTP] = useState({
    saldo: 0,
    hp: 0,
    otp: 0,
    idOrder: undefined,
  })

  useEffect(() => {
    const getUserData = getRandomUser()
    setdataUser(getUserData)
    setLoading(false)
  }, [loading])

  return (
    <>
      <div className="px-5 m-5 mx-auto xl:w-1/3">
        <Stack justify="flex-start">
          <Button
            variant="default"
            onClick={() => {
              setLoading(true)
            }}
          >
            Radom data
          </Button>

          <CopyButton value={dataUser?.fullName}>
            {({ copied, copy }) => (
              <Button
                size="md"
                justify="space-between"
                leftSection={<IconUserCircle size={18} />}
                rightSection={<span />}
                color={copied ? 'teal' : 'blue'}
                onClick={() => {
                  copy()
                  // console.log('sedang mengkopi')
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
                justify="space-between"
                leftSection={<IconUserCheck size={18} />}
                rightSection={<span />}
                color={copied ? 'teal' : 'blue'}
                onClick={() => {
                  copy()
                  // console.log('sedang mengkopi')
                }}
              >
                {copied ? 'mengkopi username' : `${dataUser.username}`}
              </Button>
            )}
          </CopyButton>
        </Stack>
      </div>
      <Otpnya />
    </>
  )
}
