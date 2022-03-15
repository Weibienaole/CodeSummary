import React, { memo, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import animations from 'create-keyframe-animation'

import {
  NormalPlayerContainer,
  Top,
  Middle,
  Bottom,
  Operators,
  CDWrapper,
  ProgressWrapper
} from './style'
import { formatPlayTime, getName, prefixStyle } from '../../../api/utils'
import { playMode } from '../../../api/config'

import ProgressBar from '../../../baseUI/ProgressBar'

const NormalPlayer = (props) => {
  const { song, fullScreen, playing, percent, duration, currentTime, mode } = props
  const {
    toggleFullScreen,
    clickPlaying,
    onProgressChange,
    handlePrev,
    handleNext,
    handleMode,
    toggleShowPlayList
  } = props

  const normalPlayerRef = useRef()
  const cdWrapperRef = useRef()

  const transform = prefixStyle('transform')

  // 进入时函数 启用帧动画
  const enter = () => {
    normalPlayerRef.current.style.display = 'block'
    const { x, y, scale } = _getPosAndScale() // 获取从mini的唱片到normal唱片 图片的偏移量
    let animation = {
      0: {
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      },
      60: {
        transform: `translate3d(0, 0, 0) scale(1.1)`
      },
      100: {
        transform: `translate3d(0, 0, 0) scale(1)`
      }
    }
    animations.registerAnimation({
      name: 'move',
      animation,
      presets: {
        duration: 400,
        easing: 'linear'
      }
    })
    animations.runAnimation(cdWrapperRef.current, 'move')
  }
  // 进入之后解绑动画
  const afterEnter = () => {
    const cdWrapperDom = cdWrapperRef.current
    animations.unregisterAnimation('move')
    cdWrapperDom.style.animation = ''
  }

  const leave = () => {
    if (!cdWrapperRef.current) return
    const cdWrapperDom = cdWrapperRef.current
    cdWrapperDom.style.transition = 'all .4s'
    const { x, y, scale } = _getPosAndScale()
    cdWrapperDom.style[
      transform
    ] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
  }

  const afterLeave = () => {
    if (!cdWrapperRef.current) return
    const cdWrapperDom = cdWrapperRef.current
    cdWrapperDom.style.transition = ''
    cdWrapperDom.style[transform] = ''
    // 一定要注意现在要把 normalPlayer 这个 DOM 给隐藏掉，因为 CSSTransition 的工作只是把动画执行一遍
    // 不置为 none 现在全屏播放器页面还是存在
    normalPlayerRef.current.style.display = 'none'
  }
  // 获取当前模式下的字体图标
  const getPlayMode = () => {
    let content
    if (mode === playMode.sequence) {
      content = '&#xe625;'
    } else if (mode === playMode.loop) {
      content = '&#xe653;'
    } else {
      content = '&#xe61b;'
    }
    return content
  }
  // 打开播放列表
  const handleToggleShowPlayList = () => {
    toggleShowPlayList(true)
  }
  return (
    <CSSTransition
      classNames="normal"
      in={fullScreen}
      timeout={400}
      mountOnEnter
      onEnter={enter}
      onEntered={afterEnter}
      onExit={leave}
      onExited={afterLeave}
      nodeRef={normalPlayerRef}
    >
      <NormalPlayerContainer ref={normalPlayerRef}>
        <div className="background">
          <img
            src={song.al.picUrl + '?param=300x300'}
            width="100%"
            height="100%"
            alt="歌曲图片"
          />
        </div>
        <div className="background layer"></div>
        <Top className="top">
          <div className="back" onClick={() => toggleFullScreen(false)}>
            <i className="iconfont icon-back">&#xe662;</i>
          </div>
          <h1 className="title">{song.name}</h1>
          <h1 className="subtitle">{getName(song.ar)}</h1>
        </Top>
        <Middle ref={cdWrapperRef}>
          <CDWrapper>
            <div className="cd">
              <img
                className={`image play ${playing ? '' : 'pause'}`}
                src={song.al.picUrl + '?param=400x400'}
                alt=""
              />
            </div>
          </CDWrapper>
        </Middle>
        <Bottom className="bottom">
          <ProgressWrapper>
            <span className="time time-l">{formatPlayTime(currentTime)}</span>
            <div className="progress-bar-wrapper">
              <ProgressBar
                percent={percent}
                percentChange={onProgressChange}
              ></ProgressBar>
            </div>
            <div className="time time-r">{formatPlayTime(duration)}</div>
          </ProgressWrapper>
          <Operators>
            <div className="icon i-left">
              <i
                className="iconfont"
                onClick={handleMode}
                dangerouslySetInnerHTML={{ __html: getPlayMode() }}
              ></i>
            </div>
            <div className="icon i-left">
              <i className="iconfont" onClick={handlePrev}>
                &#xe6e1;
              </i>
            </div>
            <div className="icon i-center">
              <i
                className="iconfont"
                onClick={(e) => clickPlaying(e, !playing)}
                dangerouslySetInnerHTML={{
                  __html: playing ? '&#xe723;' : '&#xe731;'
                }}
              ></i>
            </div>
            <div className="icon i-right">
              <i className="iconfont" onClick={handleNext}>
                &#xe718;
              </i>
            </div>
            <div className="icon i-right">
              <i className="iconfont" onClick={handleToggleShowPlayList}>&#xe640;</i>
            </div>
          </Operators>
        </Bottom>
      </NormalPlayerContainer>
    </CSSTransition>
  )
}

// 计算偏移量的辅助函数
const _getPosAndScale = () => {
  // mini的唱片数据
  const targetWidth = 40
  const paddingLeft = 40
  const paddingBottom = 40
  const paddingTop = 80
  // normal唱片的 80% / 80vw
  const width = window.innerWidth * 0.8
  const scale = targetWidth / width
  // 两个唱片的横纵坐标计算
  const x = -(window.innerWidth / 2 - paddingLeft)
  const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
  return { x, y, scale }
}

export default memo(NormalPlayer)
