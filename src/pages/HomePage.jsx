import React, { useContext } from 'react'
import styled from 'styled-components'; 


// #region --- css -----
const HomePageWrap = styled.div`
  width: 100vw;
  height: 100vh;
  background: var(--body_background);
  color: var(--body_color);
`;
// #endregion --- css ----

const HomePage = () => {

  return (
    <HomePageWrap>
      <h1>Audio Controller</h1>
      <br/>
      <p>Dark mode theme botton test</p>
    </HomePageWrap>
  )
}

export default HomePage