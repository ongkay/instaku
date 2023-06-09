import { Button, CopyButton, Input } from '@mantine/core'
import { IconAt, IconCopy } from '@tabler/icons-react'
import { ReactNode, useEffect, useState } from 'react'

interface Props {
  value: string
  actions?: () => void
  icon?: ReactNode
  name?: string
}

export default function InputCopy({ value, actions, icon, name }: Props) {
  const [values, setValues] = useState(value)

  return (
    <>
      <div className="flex items-center justify-center w-full gap-1">
        <Input
          placeholder="Masukkan Token 2fac"
          onChange={(event) => setValues(event.currentTarget.value)}
          leftSection={icon}
          value={value}
          w={'100%'}
        />
        <CopyButton value={value}>
          {({ copied, copy }) => (
            <Button
              w={'25%'}
              justify="space-between"
              leftSection={<IconCopy size={18} />}
              rightSection={<span />}
              color={copied ? 'teal' : 'blue'}
              onClick={() => {
                copy()
                if (actions) actions()
              }}
            >
              {copied ? 'Copied' : name ? name : 'copy'}
            </Button>
          )}
        </CopyButton>
      </div>
    </>
  )
}
