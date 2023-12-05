import './App.css';
import DirectionOptions from './DirectionOptions';

const start = [-122.30505981879918, 47.65331281821765 ]
const end = [-122.31176697575529, 47.654660809752976 ]

function App() {
    return (
        <div className="App">
          <header className="App-header">
            <DirectionOptions />
          </header>
        </div>
    );
}

export default App;