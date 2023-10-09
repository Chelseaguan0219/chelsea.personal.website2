import logo from './logo.svg';
import './App.css';
import NavBar from '../src/components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import  Banner  from "./components/Banner";
import  Skills  from "./components/Skills";
import  Projects from "./components/Projects";
import  Contact  from "./components/Contact";
import  Footer  from "./components/Footer";
import { useEffect, useReducer } from "react";


function App() {
  useEffect(() => {
    fetch("/api/contact")
    .then((res) => res.json())
    .then(json => console.log(json))
  },[])

  return (
    <div className="App">
      <NavBar />
      <Banner />
      <Skills />
      <Projects />
      <Contact />
      <Footer /> 
    </div>
  );
}

export default App;
