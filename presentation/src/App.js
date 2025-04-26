import Home from './pages/Home.tsx';
import Register from './pages/Register.tsx';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
 return (
   <Router>
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/register" element={<Register />} />
     </Routes>
   </Router>
 );
}

export default App;
