
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../src/context/AuthContext'; 
import { ReservationProvider } from './context/ReservationContext';
import Header from './components/Header/';
import Payment from './components/Payment';
import NotFound from './pages/NotFound';
import Seats from './pages/Seats';
import Ticket from './pages/Ticket';
import Home from './pages/Home';



function App() {
  return (
    <AuthProvider>
      <Router>
        <ReservationProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/seats" element={<Seats />} />
          <Route path='/ticket' element={<Ticket/>} />
          <Route path="/payment" element={<Payment />} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        </ReservationProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
