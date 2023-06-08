import { Button, CopyButton } from '@mantine/core'
import { IconPhoto } from '@tabler/icons-react'
import React from 'react'

export default function BtnCopy({ value, name }: any) {
  return (
    <CopyButton value={value}>
      {({ copied, copy }) => (
        <Button
          size="md"
          color={copied ? 'teal' : 'blue'}
          onClick={() => {
            copy()
            console.log('sedang mengkopi')
          }}
        >
          {name}: {copied ? `copied ${value}` : `${value}`}
        </Button>
      )}
    </CopyButton>
  )
}
