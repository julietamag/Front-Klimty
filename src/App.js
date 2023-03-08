import './App.css';
import Auth from '../src/components/Auth'

import { Route, Routes } from 'react-router';
import { Navbar } from './components/Navbar';
import { Login } from './components/Auth/Login';
import { Signup } from './components/Auth/Signup';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/login' element={<Login/>}/> 
        <Route path='/signup' element={<Signup/>}/> 
      </Routes>  
    </>
  );
}

export default App;
