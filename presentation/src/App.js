import logo from './img/agent.jpeg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          JobScout
        </h1>
        <p>
          Trust in robots.
          Don't trust in Headhunters.
        </p>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
