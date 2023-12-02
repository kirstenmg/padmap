import './App.css';
import { getAccessMapLink, getNavigation } from './directions';
import GetDirectionsButton from './GetDirectionsButton'; 
import DirectionOptions from './DirectionOptions';

const start = [-122.30505981879918, 47.65331281821765 ]
const end = [-122.31176697575529, 47.654660809752976 ]

const startObject = {longitude: -122.30505981879918, latitude: 47.65331281821765}
const endObject = {longitude:-122.31176697575529, latitude: 47.654660809752976}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DirectionOptions />
        <a href={getAccessMapLink(startObject, endObject)} target="_blank">Directions</a>
      </header>
    </div>
  );
}

export default App;
