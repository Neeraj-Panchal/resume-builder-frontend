// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Builder from './pages/Builder'; // <-- YEH IMPORT ZARURI HAI
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        {/* <-- YEH ROUTE ADD KARNE SE BLANK PAGE GAYAB HO JAYEGA --> */}
        <Route path="/builder/:id" element={
          <ProtectedRoute>
            <Builder />
          </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;