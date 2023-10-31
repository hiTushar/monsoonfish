import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <div>
        <Link to='/calendar'>Calendar</Link>
        <Link to='/chart'>Chart</Link>
      </div>
    </div>
  );
}

export default App;
