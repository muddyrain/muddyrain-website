export interface MessageType {
  type: 'chat' | 'event' | 'status'
  payload: any
}

export interface ChatType {
  id?: string
  sender_id: string
  receiver_id: string
  content: string
  formatted_create_time: string
  formatted_update_time: string
}
