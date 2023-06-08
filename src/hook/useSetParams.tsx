import { useState, useEffect, useCallback } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

const useSetParams = () => {
  const [urlParams, setUrlParams] = useState('')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams: any = useSearchParams()

  // const createQueryString = useCallback(
  //   (name: string, value: string) => {
  //     const params = new URLSearchParams(searchParams)
  //     params.set(name, value)

  //     return params.toString()
  //   },
  //   [searchParams]
  // )

  //   const setParams = (name: string, value: string) => {
  //   const url = pathname + '?' + createQueryString(name, value)
  //   router.push(url)
  //   return url
  // }

  const params = new URLSearchParams(searchParams)
  const setParams = (name: string, value: string) => {
    params.set(name, value)
    const paramsString = params.toString()

    const url = pathname + '?' + paramsString
    router.push(url)

    return url
  }

  useEffect(() => {
    const fullUrl = pathname + searchParams.toString() // get fullUrl + semua params
    setUrlParams(fullUrl)
  }, [setParams])

  return { urlParams, setParams }
}

export default useSetParams
