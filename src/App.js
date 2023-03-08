import './App.css';
import { Route, Routes } from 'react-router';
import { Navbar } from './components/Navbar';
import { Login } from './components/Auth/Login';
import { Signup } from './components/Auth/Signup';
import Profile from './components/Profile';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
      <Route path='/profile' element={<Profile/>}/> 
        <Route path='/login' element={<Login/>}/> 
        <Route path='/signup' element={<Signup/>}/> 
      </Routes>  
    </>
  );
}

export default App;
