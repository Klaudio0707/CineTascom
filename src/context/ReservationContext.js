import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState, useContext, useEffect } from 'react';
const ReservationContext = createContext(undefined);
// Função auxiliar para leitura segura do localStorage
const getStoredItem = (key) => {
    const storedItem = localStorage.getItem(key);
    if (!storedItem)
        return null;
    try {
        return JSON.parse(storedItem);
    }
    catch (e) {
        console.error(`Erro ao paassar ${key} do localStorage`, e);
        localStorage.removeItem(key); // Remove o item inválido
        return null;
    }
};
// Provedor do contexto
export const ReservationProvider = ({ children }) => {
    const [selectedMovie, setSelectedMovie] = useState(() => getStoredItem('reservation_movie'));
    const [selectedShowtime, setSelectedShowtime] = useState(() => getStoredItem('reservation_showtime'));
    const [selectedSeats, setSelectedSeats] = useState(() => getStoredItem('reservation_seats') || []);
    const [user, setUser] = useState(() => getStoredItem('reservation_user'));
    // Atualiza o localStorage sempre que os estados mudam
    useEffect(() => {
        localStorage.setItem('reservation_movie', JSON.stringify(selectedMovie));
    }, [selectedMovie]);
    useEffect(() => {
        localStorage.setItem('reservation_showtime', JSON.stringify(selectedShowtime));
    }, [selectedShowtime]);
    useEffect(() => {
        localStorage.setItem('reservation_seats', JSON.stringify(selectedSeats));
    }, [selectedSeats]);
    useEffect(() => {
        localStorage.setItem('reservation_user', JSON.stringify(user));
    }, [user]);
    // Limpeza
    const clearReservation = () => {
        setSelectedMovie(null);
        setSelectedShowtime(null);
        setSelectedSeats([]);
        setUser(null);
        localStorage.removeItem('reservation_movie');
        localStorage.removeItem('reservation_showtime');
        localStorage.removeItem('reservation_seats');
        localStorage.removeItem('reservation_user');
    };
    // Valor do contexto
    const value = {
        selectedMovie,
        selectedShowtime,
        selectedSeats,
        user,
        setSelectedMovie,
        setSelectedShowtime,
        setSelectedSeats,
        setUser,
        clearReservation,
    };
    return (_jsx(ReservationContext.Provider, { value: value, children: children }));
};
//  usar o contexto
export const useReservation = () => {
    const context = useContext(ReservationContext);
    if (!context) {
        throw new Error('useReservation deve ser usado dentro de um ReservationProvider');
    }
    return context;
};
