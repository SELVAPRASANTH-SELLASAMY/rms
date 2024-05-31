import './App.css';
import {Login,Branchlist} from './components';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index element={<Login/>}/>
          <Route path='/streams' element={<Branchlist/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
