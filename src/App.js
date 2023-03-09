import "./App.css";
import { Route, Routes } from "react-router";
import { Navbar } from "./components/Navbar";
import { Login } from "./components/Auth/Login";
import { SignupM } from "./components/Auth/SignupM";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import {Home} from "./components/Home";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupM />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
