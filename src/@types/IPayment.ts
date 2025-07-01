
export interface IMovieInfo {
  title: string;
  session: string;
}


export interface ISeatsInfo {
  selected: string[];
}


export interface IUserInfo {
  name: string;
  email: string;
  age: string;
}

export interface IPaymentData {
  movie: IMovieInfo;   
  seats: ISeatsInfo;   
  user: IUserInfo;     
  total: number;       
  paid: boolean;
}