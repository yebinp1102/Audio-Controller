import React from 'react'
import styled from 'styled-components'; 
import AudioPlayer from '../components/AudioPlayer';


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
      <AudioPlayer />
    </HomePageWrap>
  )
}

export default HomePage