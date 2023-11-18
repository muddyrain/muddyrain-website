import { Album, Favorite, Group, MusicNote, MusicVideo, Radio } from '@mui/icons-material'
import { DiscoverMusic } from '../views/discoverMusic'
import { SongList } from '../views/songList'
import { Podcast } from '../views/podcast'
import { VideoMv } from '../views/videoMv'
import { FocusOn } from '../views/focusOn'
import { MyMusic } from '../views/MyMusic'

export const RouterList = [
  {
    name: '发现音乐',
    url: 'discover-music',
    icon: <MusicNote />,
    component: <DiscoverMusic />,
  },
  {
    name: '歌单',
    url: 'song-list',
    icon: <Album />,
    component: <SongList />,
  },
  {
    name: '播客',
    url: 'podcast',
    icon: <Radio />,
    component: <Podcast />,
  },
  {
    name: '视频',
    url: 'video-mv',
    icon: <MusicVideo />,
    component: <VideoMv />,
  },
  {
    name: '关注',
    url: 'focus-on',
    icon: <Group />,
    component: <FocusOn />,
  },
  {
    name: '我的音乐',
    url: 'my-music',
    icon: <Favorite />,
    component: <MyMusic />,
  },
]
