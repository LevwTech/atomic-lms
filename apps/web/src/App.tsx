import { CountLogic } from "@atomic/frontend-logic";
import { Button, CountDisplay } from "@atomic/web-ui";

function App() {
  return (
    <CountLogic>
      {(count, increment, decrement) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: "100vw",
          }}
        >
          <CountDisplay count={count} />
          <div>
            <Button style={{ margin: "5px" }} onPress={increment} title="+1" />
            <Button style={{ margin: "5px" }} onPress={decrement} title="-1" />
          </div>
        </div>
      )}
    </CountLogic>
  );
}

export default App;
