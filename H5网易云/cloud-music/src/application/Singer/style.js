import styled from 'styled-components'
import style from '../../assets/global-style'

export const Container = styled.div`
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  bottom: ${props => props.isPlayer ? '60px' : '0'};
  right: 0;
  background: #f2f3f4;
  width: 100%;
  overflow: hidden;
  transform-origin: right bottom;
  &.fly-enter, &.fly-appear{
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
  &.fly-enter-active, &.fly-appear-active{
    transition: transform .3s;
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit {
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit {
    transition: transform .3s;
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
`

export const ImgWrapper = styled.div`
  position: relative;
  height: 0;
  width: 100%;
  transform-origin: top;
  background: url(${props => props.bgUrl}) no-repeat;
  background-size: cover;
  z-index: 50;
  padding-top: 75%;
  .filter{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.3);;
  }
`

export const CollectButton = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  box-sizing: border-box;
  z-index: 50;
  width: 120px;
  height: 40px;
  margin-top: -55px;
  background: ${style["theme-color"]};
  color: ${style["font-color-light"]};
  border-radius: 20px;
  text-align: center;
  font-size: 0;
  line-height: 40px;
  .iconfont {
    display: inline-block;
    margin-right: 10px;
    font-size: 12px;
    vertical-align: 1px;
  }
  .text {
    display: inline-block;
    font-size:14px;
    letter-spacing: 5px;
  }
`

export const BgLayer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  border-radius: 10px;
  background: white;
`

export const SongListWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  >div{
    position: absolute;
    left: 0;
    width: 100%;
    overflow: visible;
  }
`