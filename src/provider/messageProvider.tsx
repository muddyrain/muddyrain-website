import { Alert, AlertColor, Snackbar } from '@mui/material'
import React, { createContext, useState } from 'react'

export interface IMessageContext {
  showMessage: (
    msg: string,
    options?:
      | {
          type?: AlertColor
          isHasClose?: boolean
          durationClose?: number
        }
      | AlertColor
  ) => void
  hideMessage: () => void
}

export const MessageContext = createContext<IMessageContext>({
  showMessage: () => {},
  hideMessage: () => {},
})

export const MessageProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [typeColor, setTypeColor] = useState<AlertColor>('success')
  const [isHasClose, setIsHasClose] = useState(true)
  const timer = React.useRef<NodeJS.Timeout>()

  const showMessage: IMessageContext['showMessage'] = (msg, options) => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
    setOpen(() => true)
    setMessage(() => msg)
    timer.current = setTimeout(
      () => {
        hideMessage()
      },
      typeof options === 'object' ? options.durationClose : 2000
    )
    if (typeof options === 'string') {
      setTypeColor(options)
      setIsHasClose(true)
      return
    }
    setTypeColor(options?.type || 'success')
    setIsHasClose(options?.isHasClose === undefined ? true : options?.isHasClose)
  }

  const hideMessage = () => {
    setMessage(() => null)
    setOpen(() => false)
  }

  return (
    <MessageContext.Provider value={{ showMessage, hideMessage }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert {...(isHasClose ? { onClose: hideMessage } : {})} severity={typeColor}>
          {message}
        </Alert>
      </Snackbar>
    </MessageContext.Provider>
  )
}
