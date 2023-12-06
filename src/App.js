import './App.css';
import DirectionOptions from './DirectionOptions';

function App() {
    return (
        <div className="App">
          <header className="App-header">
            <h1>Restroom Finder</h1>
            <DirectionOptions />
          </header>
          <footer className="App-footer">
        © 2023 Restroom Finder. All rights reserved.
      </footer>
        </div>
    );
}

export default App;