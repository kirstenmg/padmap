import logo from './logo.svg';
import './App.css';
import { getAccessMapLink, getNavigation } from './directions';
import { Search } from './Search';

const start = [-122.30505981879918, 47.65331281821765 ]
const end = [-122.31176697575529, 47.654660809752976 ]

const startObject = {longitude: -122.30505981879918, latitude: 47.65331281821765}
const endObject = {longitude:-122.31176697575529, latitude: 47.654660809752976}
function App() {
  getNavigation(start, end).then((res) => console.log(res));

  return (
    <div className="App">
      <header className="App-header">
        <form>
        <Search/>
        </form>
        <a href={getAccessMapLink(startObject, endObject)} target="_blank">Directions</a>
      </header>
    </div>
  );
}

export default App;
