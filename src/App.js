import './App.css';
import { getAccessMapLink, getNavigation } from './directions';
import { calculateDist } from './calculateDistance.js'
import GetDirectionsButton from './GetDirectionsButton'; 
import DirectionOptions from './DirectionOptions';
import { filterRestrooms } from './filterRestrooms.js';

const start = [-122.30505981879918, 47.65331281821765 ]
const end = [-122.31176697575529, 47.654660809752976 ]

function App() {
    console.log(filterRestrooms(false, true));
    calculateDist(start, end).then(console.log);
    return (
        <div className="App">
          <header className="App-header">
            <DirectionOptions />
          </header>
        </div>
    );
}

export default App;