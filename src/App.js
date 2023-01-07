import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Register from './components/Register/Register';
import Navbar from './components/Navbar/Navbar';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import useToken from './hooks/useToken';

function App() {

  const { setToken } = useToken();

  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/logout" element={<Logout setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element=
            {
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
