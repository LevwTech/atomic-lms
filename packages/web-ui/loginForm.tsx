import { LoginLogic } from "@atomic/frontend-logic";
import { Button, TextInput } from "@atomic/web-ui";
export function LoginForm() {
  return (
    <LoginLogic>
      {(username, password, usernameSetter, passwordSetter, login) => (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[#EFF2FB]">
          <form className="flex flex-col w-[480px]">
            <TextInput
              value={username}
              onChange={(e) => usernameSetter(e.target.value)}
              placeholder="Username"
              type={"text"}
              label={"Username"}
            />

            <TextInput
              value={password}
              onChange={(e) => passwordSetter(e.target.value)}
              placeholder="Password"
              type={"password"}
              label={"Password"}
            />

            <Button title="Sign In" onPress={login}>
              Submit
            </Button>
          </form>
        </div>
      )}
    </LoginLogic>
  );
}
