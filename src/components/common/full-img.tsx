import React, { useState, useEffect } from 'react'
import {
  Dialog,
  Box,
  Card,
  CardMedia,
  CardActions,
  Button,
  Backdrop,
  CircularProgress,
  Fab
} from '@material-ui/core'
import { ArrowBack, ArrowForward, Close } from '@material-ui/icons'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    card: {
      width: '100%',
      borderRadius: 0,
      flexShrink: 0
    },
    cardMedia: {
      height: 0,
      paddingTop: '56.25%',
      backgroundSize: 'contain'
    },
    backdrop: {
      position: 'absolute',
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff'
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      '& svg': {
        transition: 'transform .2s',
        '&:hover': {
          transform: 'rotate(180deg)'
        }
      }
    }
  })
})
export interface FullImgProps {
  listLength: number,
  index: number,
  url: string,
  onSwitchImage?: (index: number) => void,
  onDownload?: (url: string) => void,
  onSetDesktop?: (url: string) => void,
}
export default function FullImg (props: FullImgProps) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [imgUrl, setImgUrl] = useState('')
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    loadImg()
    props.url && setOpen(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.url])

  const loadImg = () => {
    setImgUrl('')
    setLoading(true)
    let img: HTMLImageElement | null = new Image()
    img.onload = () => {
      img = null
      setImgUrl(props.url)
      setLoading(false)
    }
    img.src = props.url
  }

  const switchImg = (index: number) => {
    if (props.onSwitchImage) {
      props.onSwitchImage(index)
    }
  }

  return (
    <Dialog open={open} fullScreen>
      <Box display='flex' height='100%' m={2}>
        {/* 按钮菜单操作列 */}
        <Box
          width='200px'
          mr={2}
          display='flex'
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
          position='relative'
        >
          <Card className={classes.card} raised>
            <CardActions>
              <Button onClick={() => props.onDownload && props.onDownload(imgUrl)}>
                下载
              </Button>
              <Button onClick={() => props.onSetDesktop && props.onSetDesktop(imgUrl)}>
                设置桌面
              </Button>
            </CardActions>
            <CardActions>
              <Button
                disabled={props.index <= 0}
                startIcon={<ArrowBack />}
                onClick={() => switchImg(props.index - 1)}
              >
                上一张
              </Button>
              <Button
                disabled={props.index >= props.listLength - 1}
                endIcon={<ArrowForward />}
                onClick={() => switchImg(props.index + 1)}
              >
                下一张
              </Button>
            </CardActions>
          </Card>
          <br />
          <Fab
            size='small'
            className={classes.fab}
            onClick={() => setOpen(false)}
          >
            <Close />
          </Fab>
        </Box>
        {/* 图片展示区域 */}
        <Box flexGrow={1} display='flex' justifyContent='center' alignItems='center' position='relative'>
          <Backdrop open={loading} className={classes.backdrop} onClick={() => setLoading(false)}>
            <CircularProgress color='inherit' />
          </Backdrop>
          <Box flexGrow={1}>
            <Card className={classes.card} raised>
              {
                imgUrl &&
                  <CardMedia className={classes.cardMedia} image={imgUrl} />
              }
            </Card>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}
