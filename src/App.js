import "./App.css";
import { Route, Routes } from "react-router";
import { Navbar } from "./components/Navbar";
import { LoginM } from "./components/Auth/LoginM";
import { SignupM } from "./components/Auth/SignupM";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import {Home} from "./components/Home";
import toast, { Toaster } from 'react-hot-toast';
import Checkout from "./components/Checkout/Checkout";


function App() {
  return (
    <>
    <div><Toaster/></div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<LoginM />} />
        <Route path="/signup" element={<SignupM />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
