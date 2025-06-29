interface ITicket  {
    id: string;
    movieTitle: string;
    sessionTime: string;
    seats: string[];
    status: string;
    total: number;
    user: {
      name: string;
      email?: string; 
    };
  };
  interface IPrintableTicketProps {
    ticket: ITicket;
  }
  export type { ITicket, IPrintableTicketProps };