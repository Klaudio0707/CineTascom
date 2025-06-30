import type { ReactNode } from "react";
import type { IUser } from "./IUser";
  
  interface IAuthContextProps {
    user: IUser | null;
    loading: boolean;
    signIn: () => Promise<void>
    signOut: () => Promise<void>;
  }
  
  interface IAuthProviderProps {
    children: ReactNode;
  }
  
  export type {IAuthContextProps, IAuthProviderProps,IUser}