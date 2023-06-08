'use client'

import { Button, CopyButton, Loader, Paper, Stack, Text, Title } from '@mantine/core'
import { useEffect, useState } from 'react'
import { IconPhonePlus } from '@tabler/icons-react'
import {
  cancelOrderAO,
  finishOrderAO,
  getOrderByIdAO,
  newOrderOTP,
} from '@/src/lib/getAdaOTP'

export function Otpnya() {
  const [canceled, setCanceled] = useState(false)
  const [loadingHp, setLoadingHp] = useState(false)
  const [showHp, setShowHp] = useState(false)
  const [result, setResult] = useState(null)
  const [request, setRequest] = useState(0)
  const [dataOTP, setDataOTP] = useState({
    saldo: '',
    hp: '',
    otp: '',
    idOrder: '',
  })

  const getNewHpHandler = async () => {
    const res = await newOrderOTP()
    setDataOTP({
      ...dataOTP,
      idOrder: res?.order_id,
      hp: res?.number,
      otp: res?.sms,
      saldo: res?.last_saldo,
    })
    setLoadingHp(false)
    setRequest(1)
    console.log(res)
  }

  const getOTPHandler = async () => {
    console.log('ngeget OTP now')
    const res = await getOrderByIdAO(dataOTP.idOrder)
    const jsonOTP = res?.sms

    setRequest(request + 1)

    if (jsonOTP) {
      const findSmsOtp: any = JSON.stringify(jsonOTP).match(/(\d{3} \d{3})/g)
      const otpnya = findSmsOtp[0].split(' ').join('')
      console.log(otpnya)
      setResult(otpnya)

      const findSmsOtp2: any = jsonOTP.match(/(\d{3} \d{3})/g)
      const otpnya2 = findSmsOtp2[0].split(' ').join('')
      console.log(otpnya2)

      setDataOTP({
        ...dataOTP,
        otp: otpnya,
        saldo: res?.last_saldo,
      })
      setRequest(0)
      finishOrderHandler()

      console.log('OTP sdh di didapat')
    }
  }

  const cancelOrderHandler = async () => {
    const res = await cancelOrderAO(dataOTP.idOrder)
    setRequest(0)
    setCanceled(true)
    console.log(res)
  }

  const finishOrderHandler = async () => {
    const res = await finishOrderAO(dataOTP.idOrder)
    setCanceled(true)
    setRequest(0)
    console.log(res)
  }

  useEffect(() => {
    console.log(request)
    if (!result && request >= 1 && !canceled) {
      setTimeout(() => {
        getOTPHandler()

        if (request >= 80) {
          setRequest(0)
          cancelOrderHandler()
        }
        console.log('Request')
      }, 10000)
    }
  }, [showHp, request])

  return (
    <>
      <div className="px-5 m-5 mx-auto xl:w-1/3">
        <Stack justify="center" align="center">
          {!showHp ? (
            <>
              <Button
                fullWidth
                size="md"
                justify="space-between"
                leftSection={<IconPhonePlus size={18} />}
                rightSection={<span />}
                onClick={() => {
                  getNewHpHandler()
                  setShowHp(true)
                  setLoadingHp(true)
                }}
              >
                Minta Nomor HP
              </Button>
            </>
          ) : (
            <>
              <CopyButton value={dataOTP?.hp}>
                {({ copied, copy }) => (
                  <Button
                    loading={loadingHp}
                    fullWidth
                    size="md"
                    justify="space-between"
                    leftSection={<IconPhonePlus size={18} />}
                    rightSection={<span />}
                    color={copied ? 'teal' : 'cyan'}
                    onClick={() => {
                      copy()
                      // console.log('sedang mengkopi')
                    }}
                  >
                    {copied ? `Mengkopi nomor hp` : `${dataOTP?.hp}`}
                  </Button>
                )}
              </CopyButton>

              {!loadingHp && (
                <>
                  <div className="flex flex-col items-center justify-center w-[70%] gap-2">
                    <CopyButton value={dataOTP.otp}>
                      {({ copied, copy }) => (
                        <>
                          <Paper
                            shadow="lg"
                            radius="md"
                            withBorder
                            className="cursor-pointer"
                            p="md"
                            w={'100%'}
                            bg={copied ? 'cyan' : 'teal'}
                            onClick={() => {
                              if (result) {
                                copy()
                                console.log('sedang mengkopi OTP')
                              }
                            }}
                          >
                            <div className="flex flex-col items-center justify-center w-full gap-1 mb-2">
                              {result ? (
                                <>
                                  {copied ? (
                                    <>
                                      <Text ta={'center'}>Mengkopi Kode OTP</Text>
                                    </>
                                  ) : (
                                    <>
                                      <Text ta={'center'}>kode OTP :</Text>
                                    </>
                                  )}

                                  <Title ta={'center'} order={1}>
                                    {result}
                                  </Title>
                                </>
                              ) : (
                                <>
                                  <Text ta={'center'}>Meminta OTP: {request}</Text>
                                  <Loader color="violet" />
                                </>
                              )}
                            </div>
                          </Paper>
                        </>
                      )}
                    </CopyButton>
                    {!result && (
                      <>
                        <Button
                          variant="light"
                          color="red"
                          fullWidth
                          onClick={() => {
                            cancelOrderHandler()
                            setShowHp(false)
                          }}
                        >
                          Batalkan
                        </Button>
                      </>
                    )}
                    <Text ta={'center'} size="md">
                      saldo : Rp. {dataOTP.saldo}
                    </Text>
                  </div>
                </>
              )}
            </>
          )}
        </Stack>
      </div>
    </>
  )
}
