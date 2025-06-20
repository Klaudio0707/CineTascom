import React, { createContext, useState, type ReactNode } from "react";

type ReservationData = {
  movieTitle: string;
  sessionTime: string;
  seats: string[];
} | null;

type ReservationContextType = {
  reservation: ReservationData;
  setReservation: (data: ReservationData) => void;
};

export const ReservationContext = createContext<ReservationContextType>({
  reservation: null,
  setReservation: () => {},
});

type Props = {
  children: ReactNode;
};

export const ReservationProvider: React.FC<Props> = ({ children }) => {
  const [reservation, setReservation] = useState<ReservationData>(null);

  return (
    <ReservationContext.Provider value={{ reservation, setReservation }}>
      {children}
    </ReservationContext.Provider>
  );
};
