import './App.css';
import Auth from '../src/components/Auth'
import { Route, Routes } from 'react-router';
import { Navbar } from './components/Navbar';
import Footer from './components/Footer'
import ProductCard from './components/Card';


function App() {
  return (
    <div>
      <Navbar/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <Routes>
        <Route path='/auth' element={<Auth/>}/> 
      </Routes>  
      <Footer/>
    </div>
  );
}

export default App;
