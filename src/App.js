import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Games from './components/Games';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
