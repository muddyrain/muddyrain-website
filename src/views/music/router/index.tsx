import { Album, Favorite, Group, MusicNote, MusicVideo, Radio } from '@mui/icons-material'
import { lazy } from 'react'

export const RouterList = [
  {
    name: '发现音乐',
    url: 'discover-music',
    icon: <MusicNote />,
    component: lazy(() =>
      import('../views/discoverMusic').then(module => ({ default: module.DiscoverMusic }))
    ),
  },
  {
    name: '歌单',
    url: 'song-list',
    icon: <Album />,
    component: lazy(() => import('../views/podcast').then(module => ({ default: module.Podcast }))),
  },
  {
    name: '播客',
    url: 'podcast',
    icon: <Radio />,
    component: lazy(() => import('../views/podcast').then(module => ({ default: module.Podcast }))),
  },
  {
    name: '视频',
    url: 'video-mv',
    icon: <MusicVideo />,
    component: lazy(() => import('../views/videoMv').then(module => ({ default: module.VideoMv }))),
  },
  {
    name: '关注',
    url: 'focus-on',
    icon: <Group />,
    component: lazy(() => import('../views/focusOn').then(module => ({ default: module.FocusOn }))),
  },
  {
    name: '我的音乐',
    url: 'my-music',
    icon: <Favorite />,
    component: lazy(() => import('../views/MyMusic').then(module => ({ default: module.MyMusic }))),
  },
]
