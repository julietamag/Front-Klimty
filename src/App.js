import './App.css';
import Auth from '../src/components/Auth'
import { Route, Routes } from 'react-router';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/auth' element={<Auth/>}/> 
      </Routes>  
    </>
  );
}

export default App;
