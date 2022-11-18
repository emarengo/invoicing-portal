import React from 'react';
import { setAPIToken } from '../../../services/axios-instance';

interface AuthContext {
  expiration: number;
  authed: boolean;
  login(token: string, expiration: number): void;
  logout(): void;
}

const authContext = React.createContext<AuthContext>({} as AuthContext);

export const useAuthValue = () => {
  const [authed, setAuthed] = React.useState(false);
  const [expiration, setExpiration] = React.useState(0);

  return {
    authed,
    expiration,
    login(token: string, expiration: number) {
      setAuthed(true);
      setAPIToken(token);
      setExpiration(Date.now() + expiration * 1000);
      return 'logged In';
    },
    logout() {
      setAuthed(false);
      setExpiration(0);
      return 'logged Out';
    }
  };
};

/**
 * Authorization context provider for App
 * @param children - component provided with auth context
 */
export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const auth = useAuthValue();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

//Default import to consume auth context
export default function AuthConsumer() {
  return React.useContext(authContext);
}
