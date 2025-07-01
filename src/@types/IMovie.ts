interface IMovie {
    posterURL: string;
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    release_date: string;
    adult: boolean;
    popularity: number;
    showtimes: string[];
}

interface IMovieModalProps {
    movie: IMovie | null;
    isOpen: boolean;
    onClose: () => void;
  }

export type { IMovie, IMovieModalProps };