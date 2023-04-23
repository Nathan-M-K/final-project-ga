import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Games from './components/Games';
import PageNotFound from './components/PageNotFound';
import Wrapper from './components/Wrapper';
import GameDetail from './components/GameDetail';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wrapper comp={<Home />} />} />
        <Route path="/games-popular" element={<Wrapper comp={<Games category={"popular"} />} />} />
        <Route path="/games-all" element={<Wrapper comp={<Games category={"all"} />} />} />
        <Route path="/games/:gameID" element={<Wrapper comp={<GameDetail />} />} />
        <Route path="*" element={<Wrapper comp={<PageNotFound />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
