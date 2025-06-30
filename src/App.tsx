
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import { ReservationProvider } from './context/ReservationContext';
import Header from './components/Header/';
import Payment from './components/Payment';
import NotFound from './Pages/NotFound';
import Seats from './Pages/Seats';
import Ticket from './Pages/Ticket';
import Home from './Pages/Home';
import ProtectedRoute from './components/ProtectedRoute';



function App() {
  return (
    <AuthProvider>
      <Router>
        <ReservationProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/seats" 
            element={<ProtectedRoute><Seats /></ProtectedRoute>} 
          />
          <Route 
            path="/payment" 
            element={<ProtectedRoute><Payment /></ProtectedRoute>} 
          />
          <Route 
            path="/ticket" 
            element={<ProtectedRoute><Ticket /></ProtectedRoute>} 
          />
          <Route path="*" element={<NotFound />}/>
        </Routes>
        </ReservationProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
