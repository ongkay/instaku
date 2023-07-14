import { Button, CopyButton, Input } from '@mantine/core'
import { IconAt, IconClipboardCheck, IconCopy } from '@tabler/icons-react'
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
      <div className="flex flex-col items-center justify-center w-full gap-1">
        <Input.Wrapper label={name} w={'100%'}>
          <Input
            placeholder="Loading....."
            onChange={(event) => setValues(event.currentTarget.value)}
            leftSection={icon}
            value={value}
          />
        </Input.Wrapper>

        <CopyButton value={value}>
          {({ copied, copy }) => (
            <Button
              w={'100%'}
              color={copied ? 'teal' : 'blue'}
              size="xs"
              onClick={() => {
                copy()
                if (actions) actions()
              }}
            >
              {copied ? (
                <>
                  <IconClipboardCheck size={15} /> Copied {name}
                </>
              ) : (
                <>
                  <IconCopy size={15} />
                  Copy {name}
                </>
              )}
            </Button>
          )}
        </CopyButton>
      </div>
    </>
  )
}
