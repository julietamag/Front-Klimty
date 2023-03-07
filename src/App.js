import './App.css';
import Auth from '../src/components/Auth'
import { Route, Routes } from 'react-router';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/auth' element={<Auth/>}/> 
      </Routes>  
    </div>
  );
}

export default App;
