
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext'; // Certifique-se de que o caminho está correto
import Header from './components/Header';
import Home from './Pages/Home';
import Seats from './Pages/Seats';
import Payment from './components/Payment';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/seats" element={<Seats />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
