import { CountLogic } from "@atomic/frontend-logic";
import { Button, CountDisplay } from "@atomic/web-ui";

function App() {
  return (
    <CountLogic>
      {(count, increment, decrement) => (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
          <CountDisplay count={count} />
          <Button onPress={increment} title="+1" />
          <Button onPress={decrement} title="-1" />
        </div>
      )}
    </CountLogic>
  );
}

export default App;
