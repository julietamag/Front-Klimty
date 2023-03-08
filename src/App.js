import './App.css';
import Auth from '../src/components/Auth'
import { Route, Routes } from 'react-router';
import { Navbar } from './components/Navbar';
import Footer from './components/Footer'

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/auth' element={<Auth/>}/> 
      </Routes>  
      <Footer/>
    </div>
  );
}

export default App;
