import './App.css';

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
 )};

export default FormPage;