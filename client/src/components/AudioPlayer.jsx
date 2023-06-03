import React, { useRef, useState } from 'react'
import styled from 'styled-components'


// #region --- css -----
const AudioPlayerWrap = styled.div`
  width: 100vw;
  border-top: 2px solid var(--body_color);
  color: var(--body_color);
  height: 90px;
  position: fixed;
  bottom: 0;
  padding: 10px 30px;

  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const SongInfo = styled.div`
  display: flex;
  width: 250px;

  img{
    width: 70px;
    height: 70px;
    object-fit: cover;
    position: relative;
    cursor: pointer;
  }

  .titleAndArtist{
    margin: 5px 0 0 20px;
    p{
      margin-top: 7px;
    }
  }
`
const AudioController = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  // background-color: pink;
`;

const PlayingInfo = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: space-around;
  align-items: center;

  .musicProgressBar{
    width: 85%;
    height: 10px;
    border-radius: 5px;
    outline: none;
    filter: hue-rotate(160deg);
  }
`;

const AudioControlIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;


  .playBtn{
    font-size: 1.75rem;
    margin: 8px 20px;
    color: var(--body_color);
    cursor: pointer;
  }

  .musicController{
    cursor: pointer;
    font-size: 1.5rem;
    color: var(--body_color);
  }
`;

// #endregion --- css ----




const AudioPlayer = () => {
  const currentAudio = useRef();
  const [currentMusicDetail, setCurrentMusicDetail] = useState({
    title: 'AURORA',
    artist: 'Runaway',
    src: './Assets/songs/AURORA - Runaway (Lyrics).mp3',
    coverImg: './Assets/Images/image1.jpg'
  })
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [audioProgress, setAudioProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00 : 00');
  const [totalTime, setTotalTime] = useState('04 : 08');
  
  const [musicIndex, setMusicIndex] = useState(0);

  // handleAudioPlay : 재생 or 멈춤 아이콘 클릭시 호출되는 함수
  const handleAudioPlay = () => {
    if(currentAudio.current.paused){
      currentAudio.current.play();
      setIsAudioPlaying(true);
    }else{
      currentAudio.current.pause();
      setIsAudioPlaying(false);
    }
  }
    
  // handleMusicProgressBar : input의 value값만큼 음악을 건너뛴다. ex) e.target.value가 10이면 곡의 10%지점으로 이동함.
  const handleMusicProgressBar = (e) => {
    setAudioProgress(e.target.value)
    currentAudio.current.currentTime = e.target.value * currentAudio.current.duration / 100;
  }

  // handleAudioUpdate : 오디오 매초마다 현재 오디오를 몇분 몇초째 재생하는지 업데이트 하는 함수
  const handleAudioUpdate = () => {
    // Input total length of the audio
    let totalMin = Math.floor(currentAudio.current.duration / 60);
    let totalSec = Math.floor(currentAudio.current.duration % 60);
    let totalLength = `${totalMin < 10 ? `0${totalMin}` : totalMin} : ${totalSec < 10 ? `0${totalSec}` : totalSec}`
    setTotalTime(totalLength);

    let currentMin = Math.floor(currentAudio.current.currentTime / 60);
    let currentSec = Math.floor(currentAudio.current.currentTime % 60);
    let currentLength = `${currentMin < 10 ? `0${currentMin}` : currentMin} : ${currentSec < 10 ? `0${currentSec}` : currentSec}`
    setCurrentTime(currentLength);

    const progress = parseInt((currentAudio.current.currentTime / currentAudio.current.duration) * 100);
    setAudioProgress(isNaN(progress) ? 0 : progress)
  }

  // API를 통해 DB에서 플레이리스트를 불러오는 것은 Auth 기능 개발 후에 구현할 거라서 임시로 플레이리스트 만듦.
  const MusicAPI = [{
      title: 'AURORA',
      artist: 'Runaway',
      src: './Assets/songs/AURORA - Runaway (Lyrics).mp3',
      coverImg: './Assets/Images/image1.jpg'
    },{
      title: 'Baby doll',
      artist: 'Kanika Kapoor',
      src: './Assets/songs/Baby doll [ slowed + reverb ] __ meet bros ,Kanika Kapoor __ jr santu.mp3',
      coverImg: './Assets/Images/image2.jpg'
    },{
      title: 'Catch Me If I Fall',
      artist: 'NEFFEX',
      src: './Assets/songs/Catch Me If I Fall - NEFFEX.mp3',
      coverImg: './Assets/Images/image3.jpg'
    },{
      title: 'Chasing',
      artist: 'NEFFEX',
      src: './Assets/songs/Chasing - NEFFEX.mp3',
      coverImg: './Assets/Images/image4.jpg'
    },{
      title: 'Inspired',
      artist: 'NEFFEX',
      src: './Assets/songs/Inspired (Clean) - NEFFEX.mp3',
      coverImg: './Assets/Images/image5.jpg'
    }]

  // handlePrevSong이나 handleNextSong 함수 실행 시 
  const updateCurrentMusicDetails = (num) => {
    let musicObject = MusicAPI[num];
    currentAudio.current.src = musicObject.src;
    currentAudio.current.play();
    setCurrentMusicDetail({
      title: musicObject.title,
      artist: musicObject.artist,
      src: musicObject.src,
      coverImg: musicObject.coverImg
    })
    setIsAudioPlaying(true);
  }

  // handlePrevSong : 플레이 리스트에서 현재 곡을 기준으로 이전 곡의 정보를 불러오는 함수
  const handlePrevSong = () => {
    if(musicIndex === 0){
      let setNum = MusicAPI.length -1;
      setMusicIndex(setNum);
      updateCurrentMusicDetails(setNum);
    }else{
      let setNum = musicIndex -1;
      setMusicIndex(setNum);
      updateCurrentMusicDetails(setNum);
    }
  }
  
  // handleNextSong :  플레이 리스트에서 현재 곡을 기준으로 다음 곡의 정보를 불러오는 함수
  const handleNextSong = () => {
    if(musicIndex >= MusicAPI.length -1){
      let setNum = 0;
      setMusicIndex(setNum)
      updateCurrentMusicDetails(setNum)
    }else{
      let setNum = musicIndex + 1;
      setMusicIndex(setNum)
      updateCurrentMusicDetails(setNum)
    }
  }

  return (
    <AudioPlayerWrap>
      <audio src='./Assets/songs/AURORA - Runaway (Lyrics).mp3' onEnded={handleNextSong} ref={currentAudio} onTimeUpdate={handleAudioUpdate} />
      
      {/* Cover Img & Title & Artist */}
      <SongInfo>
        <img
          src={currentMusicDetail.coverImg}
          alt='Song Album'
          id='songAlbum'
        />
        <div className='titleAndArtist'>
          <p className="musicTitle" style={{fontWeight: 'bold'}}>{currentMusicDetail.title}</p>
          <p className="musicArtist" style={{fontWeight: '100'}}>{currentMusicDetail.artist}</p>
        </div>
      </SongInfo>

      <AudioController>

        {/* Icons */}
        <AudioControlIcons>
          <i className="fa-solid fa-backward musicController" onClick={handlePrevSong}></i>
          <i className={`fa-solid ${isAudioPlaying ? 'fa-pause-circle' : 'fa-circle-play'} playBtn`} onClick={handleAudioPlay}></i>
          <i className="fa-solid fa-forward musicController" onClick={handleNextSong}></i>
        </AudioControlIcons>

        {/* currentTiem & progress bar & duration  */}
        <PlayingInfo>
          <p>{currentTime}</p>
          <input 
            type="range" 
            name="musicProgressBar" 
            className="musicProgressBar" 
            value={audioProgress}
            onChange={handleMusicProgressBar}
          />
          <p>{totalTime}</p>
        </PlayingInfo>
      
      </AudioController>

      <div style={{width: '160px', height: '100%'}}></div>

    </AudioPlayerWrap>
  )
}

export default AudioPlayer