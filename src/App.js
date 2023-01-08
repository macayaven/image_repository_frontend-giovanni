import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import ImageDetail from './components/ImageDetail/ImageDetail';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Register from './components/Register/Register';
import Navbar from './components/Navbar/Navbar';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import useToken from './hooks/useToken';

function App() {

  const { setToken, isAuthenticated } = useToken();

  return (
    <div className="App">
      <Navbar isAuthenticated={ isAuthenticated } />
      <main>
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/logout" element={<Logout setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route exact path="/" element=
            {
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route path="/images/:imageId" element=
            {
              <ProtectedRoute>
                <ImageDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
