import './App.css';
import logo from './img/agent.jpeg';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('jobscout-cwbfbhdaa7ewfxbh.spaincentral-01.azurewebsites.net/api/Users/getOneUser');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

 return (
   <div className="App">
     <header className="App-header">
       <h1>JobScout</h1>
       <p>Hello {JSON.stringify(data)} Trust in robots. Don't trust in Headhunters.</p>
       <img src={logo} className="App-logo" alt="logo" />
       <Link to="/form">
         <button>Ask me a Job</button>
       </Link>
     </header>
   </div>
 );
}

export default Home;