import '../App.css';
import { Link } from 'react-router-dom';

function Register() {
 return (
   <div className="App">
     <header className="App-header">
       <h4>Register in Jobscout</h4>
       <form>
          <div>
           <label htmlFor="Name">Name: </label>
           <input type="text" id="name" name="name"/>
         </div>
         <div>
           <label htmlFor="Email">Email: </label>
           <input type="text" id="email" name="email"/>
         </div>
         <div>
           <label htmlFor="companies">Companies: </label>
           <input type="text" id="companies" name="companies" placeholder="e.g., Google;Amazon;New Relic;" />
         </div>
         <div>
           <label htmlFor="jobtitles">Job Titles: </label>
           <input type="text" id="jobtitles" name="jobtitles" placeholder="e.g., Software Engineer; Senior Software Engineer;"/>
         </div>
         <div>
          <Link to="/">
            <button>Back</button>
          </Link>
          <button type="submit">Register</button>
         </div>
         
       </form>
       <p>We are not responsible for any data loss or damage caused by the use of this platform.</p>
     </header>
   </div>
 )};

export default Register;