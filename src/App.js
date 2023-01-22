import Header from "./components/Header/Header";
import './App.css'
import LabelBottomNavigation from "./components/LabelBottomNavigation";
import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Trending from "./pages/Trending/Trending";
import Movies from "./pages/Movies/Movies";
import Series from "./pages/Series/Series";
import Search from "./pages/Search/Search";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="app">
          <Container style={{paddingBottom:'70px'}}>
            <Routes>
              <Route path="/" element={<Trending/>} caseSensitive />
              <Route path="/movies" element={<Movies/>}/>
              <Route path="/series" element={<Series/>}/>
              <Route path="/search" element={<Search/>}/>
            </Routes>
          </Container>
          <LabelBottomNavigation />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
