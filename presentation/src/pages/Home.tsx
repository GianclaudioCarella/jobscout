import '../App.css';
// import logo from '../img/agent.jpeg';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { Button } from "@/components/ui/button";

const Home: React.FC = () => {
  const [userData, setUserData] = useState<{ username: string; companies: string; jobTitles: string } | null>(null);
  const [userEmail, setUserEmail] = useState('');

  const fechUserData = async (emailInput: string) => {
    try {
      console.log('emailInput:', emailInput);
      setUserEmail(emailInput)
      if (emailInput === '') {
        return;
      }
      const url = "http://jobscout-agent.com/api/Users/email/" + emailInput;
      console.log('value:', url);
      const response = await axios.get(url);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const ReloadPage = () => {
    window.location.reload();
  }

  useEffect(() => {
    // const fetchData = async (email) => {
    //   try {
    //     const response = await axios.get('https://jobscout-cwbfbhdaa7ewfxbh.spaincentral-01.azurewebsites.net/api/Users/getOneUser');
    //     setData(response.data);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };

    // fetchData();
  }, []);

  return (
    <>
    <div className="App">
      <header className="App-header">

        {/* SHOW WHEN THE USER DATA IS NOT FECHED */}
        {!userData && (
          <>
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            <h4>Welcome to JobScout</h4>
            <p>
              JobScout is a platform that helps you find your dream job by connecting you with the best job offers and companies.
            </p>
            <p>
              We are currently in beta version. Please register to be part of our community.
            </p>
            <p>
              Please insert your email or register.
            </p>

            <div>
              <label>Email: </label>
              <input type="text" id="email" name="email" placeholder="Enter your email" />
              {/* <Button>Button</Button> */}
              <button onClick={() =>
                {const emailInput = document.getElementById('email') as HTMLInputElement | null;
                if (emailInput) {
                  fechUserData(emailInput.value);
                }
              }}>Submit</button>
            </div>
          </>
        )}

        {/* SHOW WHEN THE USER DATA IS FECHED */}
        {userData && (
          <>
            <p>Hello {userData.username}. Looks like you are looking for jobs in {userData.companies} as {userData.jobTitles}.</p>
            <button onClick={() => ReloadPage()}>Back</button>
          </>
        )}

        {/* SHOW WHEN THE USER DATA IS NOT FECHED */}
        {!userData && (
          <>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </>
        )}

      </header>
      <p>Trust in robots. Don't trust in Headhunters.</p>
    </div>
  );
  </>
)}

export default Home;