import { CountLogic } from '@atomic/frontend-logic';
import { Button, CountDisplay } from '@atomic/web-ui';

function App() {
  return (
    <CountLogic>
      {(count, increment, decrement) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            width: '100vw',
          }}
        >
          <CountDisplay count={count} />
          <Button onPress={increment} title="+1" />
          <Button onPress={decrement} title="1" />
        </div>
      )}
    </CountLogic>
  );
}

export default App;
