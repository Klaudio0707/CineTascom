import { createContext, useState, useContext, type ReactNode, useEffect } from 'react';
import type { IResevartionContext, IMovie, ISeat, IUser } from "../@types/IContextResevation";

const ReservationContext = createContext<IResevartionContext | undefined>(undefined);

// Função auxiliar para leitura segura do localStorage
const getStoredItem = <T,>(key: string): T | null => {
  const storedItem = localStorage.getItem(key);
  if (!storedItem) return null;
  try {
    return JSON.parse(storedItem) as T;
  } catch (e) {
    console.error(`Erro ao paassar ${key} do localStorage`, e);
    localStorage.removeItem(key); // Remove o item inválido
    return null;
  }
};

// Provedor do contexto
export const ReservationProvider = ({ children }: { children: ReactNode }) => {

  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(() => getStoredItem<IMovie>('reservation_movie'));
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(() => getStoredItem<string>('reservation_showtime'));
  const [selectedSeats, setSelectedSeats] = useState<ISeat[]>(() => getStoredItem<ISeat[]>('reservation_seats') || []);
  const [user, setUser] = useState<IUser | null>(() => getStoredItem<IUser>('reservation_user'));

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
  const value: IResevartionContext = {
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

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
};

//  usar o contexto
export const useReservation = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error('useReservation deve ser usado dentro de um ReservationProvider');
  }
  return context;
};
