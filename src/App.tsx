// src/App.tsx
import { Stage } from './components/Game/Stage';

function App() {

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      backgroundColor: '#2c3e50',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Stage />
    </div>
  );
}

export default App;