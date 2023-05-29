import HomePage from "./pages/HomePage";
import DarkModeBtn from "./components/DarkModeBtn";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <DarkModeBtn />
    </BrowserRouter>
  );
}

export default App;
