import type { IMovie } from "./IMovie";
import type { ISeat } from "./ISeats";
import type { IUser } from "./IUser";

interface IResevartionContext {
  selectedMovie: IMovie | null;
  setSelectedMovie: (movie: IMovie | null) => void;

  selectedShowtime: string | null;
  setSelectedShowtime: (showtime: string | null) => void;

  selectedSeats: ISeat[];
  setSelectedSeats: (seats: ISeat[]) => void;

  user: IUser | null;
  setUser: (user: IUser | null) => void;

  clearReservation: () => void;
  }
  export type {IResevartionContext, IMovie, ISeat, IUser}