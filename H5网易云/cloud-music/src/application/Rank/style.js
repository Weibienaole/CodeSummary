import styled from 'styled-components';
import style from '../../assets/global-style';

export const Conatiner = styled.div`
  position: fixed;
  top: 90px;
  bottom: ${props => props.isPlayer ? '60px' : '0'};
  width: 100%;
  .offical, .global{
    margin: 10px 5px;
    padding-top: 15px;
    font-weight: 700;
    font-size: ${style['font-size-m']};
    color: ${style['font-color-desc']};
  }
`

export const List = styled.ul`
  margin-top: 10px;
  padding: 0 5px;
  display: ${props => props.isGlobal ? "flex" : ""};
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  background: ${style["background-color"]};
  &::after {
    content:"";
    display:block;
    width: 32vw;
  }
`

export const ListItem = styled.li`
  display: ${props => !props.isGlobal ? "flex" : ""};
  padding: 3px 0;
  border-bottom: 1px solid ${style["border-color"]};
  .img_wrapper {
    width:  ${props => !props.isGlobal ? "27vw" : "32vw"};
    height: ${props => !props.isGlobal ? "27vw" : "32vw"};
    border-radius: 3px;
    position: relative;
    .decorate {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient (hsla(0,0%,100%,0),hsla(0,0%,43%,.4));
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
    .update_frequecy {
      position: absolute;
      left: 7px;
      bottom: 7px;
      font-size: ${style["font-size-ss"]};
      color: ${style["font-color-light"]};
    }
  }
`

export const SongList = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 10px;
  >li {
    font-size: ${style["font-size-s"]};
    color: grey;
  }
`;


export const EnterLoading = styled.div`
  position: fixed;
  left: 0; right: 0; top: 0; bottom: 0;
  width: 100px;
  height: 100px;
  margin: auto;
`
