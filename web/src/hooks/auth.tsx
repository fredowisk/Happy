import React, { createContext, useCallback, useContext, useState } from "react";
import api from "../services/api";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  signed: boolean;
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

//Criando um contexto vazio e forçando sua tipagem a ser do tipo AuthContextData
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

//Criando um componente
export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem("@Happy:token");
    const user = localStorage.getItem("@Happy:user");

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post("/sessions", {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem("@Happy:token", token);
    localStorage.setItem("@Happy:user", JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@Happy:token");
    localStorage.removeItem("@Happy:user");

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem("@Happy:user", JSON.stringify(user));
      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token]
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser, signed: Boolean(data.user) }}
    >
      {/* Repassando tudo o que foi recebido como parâmetro */}
      {children}
    </AuthContext.Provider>
  );
};

// Função que pega o context e retorna ele
export function useAuth(): AuthContextData {
  return useContext(AuthContext);
}
