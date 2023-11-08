import { FC, useEffect, useState } from 'react'
import { Banner, NewSongs, RecommendedPlaylist } from './components'

import { ScrollView } from '@/components'

export const DiscoverMusic: FC = () => {
  return (
    <ScrollView className="px-4">
      <Banner />
      <RecommendedPlaylist />
      <NewSongs />
    </ScrollView>
  )
}
