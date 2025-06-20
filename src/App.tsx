
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../src/context/AuthContext'; // Certifique-se de que o caminho está correto
import Header from './components/Header';
import Home from './pages/Home';
import Seats from './pages/Seats';
import Payment from './components/Payment';
import Ticket from './pages/Ticket';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/seats" element={<Seats />} />
          <Route path='/ticket' element={<Ticket/>} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
