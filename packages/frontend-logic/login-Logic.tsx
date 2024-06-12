import * as React from "react";

interface LoginLogicProps {
  children: (
    username: string,
    password: string,
    setUsername: (value: string) => void,
    setPassword: (value: string) => void,
    login: () => void,
  ) => JSX.Element;
}

export const LoginLogic: React.FC<LoginLogicProps> = ({ children }) => {
  return children(username, password, setUsername, setPassword, login);
};
