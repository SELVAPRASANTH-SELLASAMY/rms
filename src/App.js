import './App.css';
import {Login,Depts} from './components';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index element={<Login/>}/>
          <Route path='/streams' element={<Depts/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
