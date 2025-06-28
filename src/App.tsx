
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../src/context/AuthContext'; 
import { ReservationProvider } from './context/ReservationContext';
import Home from './pages/Home/index';
import NotFound from './pages/Error/index.tsx';
import Seats from './pages/Seats/index.tsx';
import Ticket from './pages/Ticket/index.tsx';
import Header from './components/Header/index.tsx';
import Payment from './components/Payment/index.tsx';


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
