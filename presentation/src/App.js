import Home from './Home';
import FormPage from './FormPage';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
 return (
   <Router>
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/form" element={<FormPage />} />
     </Routes>
   </Router>
 );
}

export default App;
