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
        <Route path="/games" element={<Wrapper comp={<Games />} />} />
        <Route path="*" element={<Wrapper comp={<PageNotFound />} />} />
        <Route path="/games/:gameID" element={<Wrapper comp={<GameDetail />} />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
