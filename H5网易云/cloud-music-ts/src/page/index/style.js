import styled from 'styled-components';

import style from '../../assets/global-style';

const Top = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
padding: 5px 10px;
background: ${style["theme-color"]};
&>span {
  line-height: 40px;
  color: #f1f1f1;
  font-size: 20px;
  &.iconfont {
    font-size: 25px;
  }
}
`

const Tab = styled.div`
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: ${style["theme-color"]};
  a {
    flex: 1;
    padding: 2px 0;
    font-size: 14px;
    color: #e4e4e4;
    &.selected {
      span {
        padding: 3px 0;
        font-weight: 700;
        color: #f1f1f1;
        border-bottom: 2px solid #f1f1f1;
      }
    }
  }
`
const TabItem = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export { Top, Tab, TabItem }