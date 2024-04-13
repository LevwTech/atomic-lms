import { LoginLogic } from "@atomic/frontend-logic";
import { Button, FormInput } from "@atomic/web-ui";

interface LoginFormProps {
  logo: string;
}

export function LoginForm({ logo }: LoginFormProps): JSX.Element {
  return (
    <LoginLogic>
      {(username, password, setUsername, setPassword, login) => (
        <div className="w-[50%]">
          <form className="flex flex-col w-[480px] mx-auto">
            <img alt="Logo" className="w-72 self-center mb-20" src={logo} />
            <FormInput
              label="Username"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                setUsername(target.value);
              }}
              placeholder="Username"
              type="text"
              value={username}
            />

            <FormInput
              forgetPassword
              label="Password"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                setPassword(target.value);
              }}
              placeholder="Password"
              type="password"
              value={password}
            />
            <Button onPress={login}>Sign In</Button>
          </form>
        </div>
      )}
    </LoginLogic>
  );
}
