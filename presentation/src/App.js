// import logo from './img/agent.jpeg';
// import './App.css';

// function App() {
//     return (
//         <div className="App">
//             <header className="App-header">
//                 <h1>
//                     JobScout
//                 </h1>
//                 <p>
//                     Trust in robots.
//                     Don't trust in Headhunters.
//                 </p>
//                 <img src={logo} className="App-logo" alt="logo" />
//             </header>
//         </div>
//     );
// }

// export default App;


import logo from './img/agent.jpeg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
 return (
   <Router>
     <Routes>
       <Route path="/index.html" element={<Home />} />
       <Route path="/form" element={<FormPage />} />
     </Routes>
   </Router>
 );
}

function Home() {
 return (
   <div className="App">
     <header className="App-header">
       <h1>JobScout</h1>
       <p>Trust in robots. Don't trust in Headhunters.</p>
       <img src={logo} className="App-logo" alt="logo" />
       <Link to="/form">
         <button>Ask me a Job</button>
       </Link>
     </header>
   </div>
 );
}

function FormPage() {
 return (
   <div className="App">
     <header className="App-header">
       <h4>Give me some information about the job you want</h4>
       <form>
         <div>
           <label htmlFor="companies">Companies: </label>
           <input type="text" id="companies" name="companies" placeholder="e.g., Google;Amazon;New Relic;" />
         </div>
         <div>
           <label htmlFor="input2">Job Titles: </label>
           <input type="text" id="jobtitles" name="jobtitles" placeholder="e.g., Software Engineer; Senior Software Engineer;"/>
         </div>
         <button type="submit">Submit</button>
       </form>
     </header>
   </div>
 );
}

export default App;
