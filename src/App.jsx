import { Route, Routes } from 'react-router-dom';

import GlobalThemeToggle from './components/GlobalThemeToggle';
import ProtectedRoute from './components/ProtectedRoute';
import PublicOnlyRoute from './components/PublicOnlyRoute';
import Archive from './pages/Archive';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import NoteDetail from './pages/NoteDetail';
import Register from './pages/Register';

function App() {
  return (
    <>
      <GlobalThemeToggle />
      <Routes>
        {/* protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/notes/:id" element={<NoteDetail />} />
          <Route path="/archive" element={<Archive />} />
        </Route>

        {/* public only routes */}
        <Route element={<PublicOnlyRoute />}>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Route>

        {/* not found route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
