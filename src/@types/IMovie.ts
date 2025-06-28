interface IMovie {
    posterURL: any;
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    release_date: string;
    adult: boolean;
    showtimes: string[];
}

interface IMovieModalProps {
    movie: IMovie | null;
    isOpen: boolean;
    onClose: () => void;
  }

export type { IMovie, IMovieModalProps };