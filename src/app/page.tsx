'use client';
import {
  WaterDrop as WaterDropIcon,
  MoreVert as MoreVertIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  ExpandMore as ExpandMoreIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
  IconButton,
  CardMedia,
  CardActions,
  List,
} from '@mui/material';
import Image from 'next/image';
import Carousel from 'react-material-ui-carousel';
import { useSetState } from 'ahooks';
import { red } from '@mui/material/colors';
import { getRandomNumber } from '@/utils';
import { Suspense } from 'react';
export default function Home() {
  const list = [
    'https://muddyrain-oss.oss-cn-hangzhou.aliyuncs.com/1.jpg',
    'https://muddyrain-oss.oss-cn-hangzhou.aliyuncs.com/2.jpg',
    'https://muddyrain-oss.oss-cn-hangzhou.aliyuncs.com/3.jpg',
  ];
  const [{ autoPlay, expanded }, dispatch] = useSetState({
    autoPlay: true,
    expanded: false,
  });
  return (
    <div className='w-container mx-auto p-3'>
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h6'>展示风采</Typography>
        <FormControlLabel
          control={
            <Switch
              checked={autoPlay}
              onChange={e => {
                dispatch({
                  autoPlay: e.target.checked,
                });
              }}
            />
          }
          label='自动播放'
        />
      </Stack>
      {/* 轮播图 */}
      <Carousel
        autoPlay={autoPlay}
        interval={5000}
        duration={1000}
        className='relative h-[660px]'
        IndicatorIcon={<WaterDropIcon />}
        indicatorContainerProps={{
          className: 'absolute bottom-4 z-10',
        }}
        indicatorIconButtonProps={{
          className: 'hover:text-white text-zinc-400 mx-1',
        }}
        activeIndicatorIconButtonProps={{
          style: {
            color: 'white',
          },
        }}
      >
        {list.map((item, index) => {
          return (
            <div className='h-[660px] relative' key={index}>
              <Image
                layout='fill'
                className='w-full h-full rounded-lg cursor-pointer'
                src={item}
                width={0}
                height={0}
                alt='Picture of the author'
              />
              <div className='absolute bottom-10 left-10'>
                <Button
                  variant='contained'
                  className='rounded-full duration-300'
                >
                  请阅读我
                </Button>
                <Typography color='white' className='mt-2'>
                  芳树无人花自落，春山一路鸟空啼
                </Typography>
              </div>
            </div>
          );
        })}
      </Carousel>
      {/* 介绍 */}
      <Stack direction='row' spacing={4} className='mt-4'>
        <Stack className='w-2/3'>
          <Typography variant='h6'>介绍好文</Typography>
          <List>
            <Card className='shadow-lg border border-solid border-zinc-100'>
              {/* <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                    R
                  </Avatar>
                }
                action={
                  <IconButton aria-label='settings'>
                    <MoreVertIcon />
                  </IconButton>
                }
                title='Shrimp and Chorizo Paella'
                subheader='September 14, 2016'
              /> */}
              <CardMedia
                component='img'
                height='240'
                image={list[0]}
                alt='Paella dish'
              />
              <CardContent>
                <Typography className='mb-2' variant='h6' color='InfoText'>
                  江畔河谷
                </Typography>
                <Typography
                  className='mb-2'
                  variant='body2'
                  color='text.secondary'
                >
                  长歌濯足烟霞里，始信幽人乐是真。 芦汀洲隐浦应制;
                  长镵种玉云千亩，短棹垂纶雨一蓑。 川原和居野应制;
                  三年游宦客京师，长忆丰城送别时
                </Typography>
                <Button variant='outlined'>开始阅读</Button>
              </CardContent>
              <CardActions disableSpacing>
                <Stack direction='row' alignItems='center' spacing={1}>
                  <Button variant='text' startIcon={<VisibilityIcon />}>
                    20
                  </Button>
                  <Button variant='text' startIcon={<FavoriteIcon />}>
                    1
                  </Button>
                  <Button variant='text' startIcon={<ShareIcon />}>
                    2
                  </Button>
                </Stack>
              </CardActions>
            </Card>
          </List>
        </Stack>
        <Stack className='w-1/3'>
          <Typography variant='h6'>最近动态</Typography>
        </Stack>
      </Stack>
    </div>
  );
}
