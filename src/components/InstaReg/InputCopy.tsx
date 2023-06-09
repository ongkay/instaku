import { Button, CopyButton, Input } from '@mantine/core'
import { IconAt, IconCopy } from '@tabler/icons-react'
import { FC, ReactNode } from 'react'

interface Props {
  value: string
  actions?: () => void
  icon?: ReactNode
}

export default function InputCopy({ value, actions, icon }: Props) {
  return (
    <>
      <div className="flex items-center justify-center w-full gap-2">
        <Input
          placeholder="Masukkan Token 2fac"
          leftSection={icon}
          value={value}
          w={'100%'}
        />
        <CopyButton value={value}>
          {({ copied, copy }) => (
            <Button
              justify="space-between"
              leftSection={<IconCopy size={18} />}
              rightSection={<span />}
              color={copied ? 'teal' : 'blue'}
              onClick={() => {
                copy()
                if (actions) actions()
              }}
            >
              {copied ? 'Copied' : 'copy'}
            </Button>
          )}
        </CopyButton>
      </div>
    </>
  )
}
