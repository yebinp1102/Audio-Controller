import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import DarkModeIcon from '@mui/icons-material/DarkMode';


// #region --- css ------

const ThemeToggleBtn = styled.button`
  background-color: var(--body_background);
  color: var(--body_color);
  padding: .75rem 1rem;
  border: 1px solid #eee;
  border-radius: 20px;
  display: flex;
  align-items: center;
  font-size: 14px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  
  svg{
    height: 1rem;
  }

  p{
    margin-left: 2px;
  }
`;
// #endregion --- css -----


const DarkModeBtn = () => {
  const localTheme = localStorage.getItem('selectedTheme');
  const [selectedTheme, setSelectedTheme] = useState(localTheme);

  const setDarkMode = () => {
    document.querySelector("body").setAttribute('data-theme','dark');
    localStorage.setItem('selectedTheme', 'dark');
    setSelectedTheme('dark');
  }

  const setLightMode = () => {
    document.querySelector("body").setAttribute('data-theme','light');
    localStorage.setItem('selectedTheme', 'light');
    setSelectedTheme('light');
  }

  useEffect(() => {
    if(localTheme === 'dark') setDarkMode();
    else setLightMode();
  })

  const toggleTheme = () => {
    if(selectedTheme === 'dark') setLightMode();
    else setDarkMode();
  }

  return (
    <div>
      <ThemeToggleBtn onClick={toggleTheme}>
        <DarkModeIcon />
        <p>{selectedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}</p>
      </ThemeToggleBtn>
    </div>
  )
}

export default DarkModeBtn