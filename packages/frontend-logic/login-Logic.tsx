import * as React from "react";

interface loginLogicProps {
  children: (
    username: string,
    password: string,
    setUsername: () => void,
    setPassword: () => void,
    login: () => void
  ) => JSX.Element;
}

export const LoginLogic: React.FC<loginLogicProps> = ({ children }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const usernameSetter = (value) => {
    setUsername(value);
  };
  const passwordSetter = (value) => {
    setPassword(value);
  };
  const login = () => {
    console.log(username, password);
  };

  return children(username, password, usernameSetter, passwordSetter, login);
};
