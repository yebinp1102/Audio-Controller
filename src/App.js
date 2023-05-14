import { useState } from "react";
import styled from "styled-components";
import { ThemeContext } from "./context/ThemeContext";
import HomePage from "./pages/HomePage";
import DarkModeBtn from "./components/DarkModeBtn";

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <ThemeContext.Provider value={{isDark, setIsDark}}>
      <HomePage />
      <DarkModeBtn />
    </ThemeContext.Provider>
  );
}

export default App;
