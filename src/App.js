import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../src/context/AuthContext';
import { ReservationProvider } from './context/ReservationContext';
import Home from './pages/Home';
import NotFound from './pages/Error';
import Seats from './pages/Seats';
import Ticket from './pages/Ticket';
import Header from './components/Header/';
import Payment from './components/Payment';
function App() {
    return (_jsx(AuthProvider, { children: _jsx(Router, { children: _jsxs(ReservationProvider, { children: [_jsx(Header, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/seats", element: _jsx(Seats, {}) }), _jsx(Route, { path: '/ticket', element: _jsx(Ticket, {}) }), _jsx(Route, { path: "/payment", element: _jsx(Payment, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] })] }) }) }));
}
export default App;
