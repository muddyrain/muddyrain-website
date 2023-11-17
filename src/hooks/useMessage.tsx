import { IMessageContext, MessageContext } from '@/provider/messageProvider'
import { useContext } from 'react'

export const useMessage = (): IMessageContext => useContext(MessageContext)
