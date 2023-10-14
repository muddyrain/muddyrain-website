import { Box, Tab, Tabs } from '@mui/material'
import { FC, useState } from 'react'
import { Empty } from '../Empty'

export type TabItem = {
  label: string
  value: number
  children?: React.ReactNode
}
export const MTabs: FC<{
  items: TabItem[]
  className?: string
}> = ({ className, items }) => {
  const [currentTab, setCurrentTab] = useState(items[0].value)
  return (
    <>
      <Tabs
        className={className}
        value={currentTab}
        onChange={(_, value) => {
          setCurrentTab(value)
        }}
      >
        {items.map(tab => (
          <Tab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </Tabs>
      {items.map(tab => (
        <Box key={tab.value} hidden={tab.value !== currentTab}>
          {tab.children ? tab.children : <Empty />}
        </Box>
      ))}
    </>
  )
}
