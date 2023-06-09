'use client'

import { Suspense } from 'react'
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle'
import { InstaReg } from '../components/InstaReg'

export default function HomePage() {
  return (
    <>
      <InstaReg />
      <ColorSchemeToggle />
    </>
  )
}
