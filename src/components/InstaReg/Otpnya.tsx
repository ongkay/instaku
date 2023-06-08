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
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import useSetParams from '@/src/hook/useSetParams'

export function Otpnya() {
  const searchParams: any = useSearchParams()
  const { urlParams, setParams } = useSetParams()
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
    setParams('hp', res.number)
    setParams('idOrder', res?.order_id)
    setLoadingHp(false)
    setRequest(1)
  }

  const getOTPHandler = async () => {
    const res = await getOrderByIdAO(dataOTP.idOrder)
    const jsonOTP = res?.sms
    const id = res?.order_id

    if (id) {
      setRequest(request + 1)
      setDataOTP({
        ...dataOTP,
        saldo: res?.last_saldo,
      })
    } else {
      console.log('gagal get OTP handler karena response tidak ada orderidnya')
      setRequest(0)
      setCanceled(true)
    }

    if (jsonOTP) {
      const findSmsOtp: any = JSON.stringify(jsonOTP).match(/(\d{3} \d{3})/g)
      const otpnya = findSmsOtp[0].split(' ').join('')
      setResult(otpnya)
      setDataOTP({
        ...dataOTP,
        otp: otpnya,
        saldo: res?.last_saldo,
      })
      setRequest(0)
      finishOrderHandler()
      setParams('otp', otpnya)

      //// tester aja
      // const findSmsOtp2: any = jsonOTP.match(/(\d{3} \d{3})/g)
      // const otpnya2 = findSmsOtp2[0].split(' ').join('')
      // console.log(otpnya2)
    }
  }

  const cancelOrderHandler = async () => {
    await cancelOrderAO(dataOTP.idOrder)
    setRequest(0)
    setCanceled(true)
  }

  const finishOrderHandler = async () => {
    await finishOrderAO(dataOTP.idOrder)
    setCanceled(true)
    setRequest(0)
  }

  useEffect(() => {
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

  useEffect(() => {
    const hp = searchParams.get('hp')
    const otp = searchParams.get('otp')
    const idOrder = searchParams.get('idOrder')

    if (hp) {
      setShowHp(true)
      setLoadingHp(false)
      setDataOTP({
        ...dataOTP,
        hp,
        idOrder,
      })

      if (otp) {
        setCanceled(true)
        setRequest(0)
        setResult(otp)
        setDataOTP({
          ...dataOTP,
          otp,
        })
      } else {
        setRequest(2)
        setCanceled(false)
      }

      // if (!otp) {
      // }
    }
  }, [])

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
                            bg={result ? 'cyan' : 'gray'}
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
                                  <Loader color="pink" />
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
