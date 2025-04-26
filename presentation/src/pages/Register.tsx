import '../App.css';
import { Link } from 'react-router-dom';
import React, { useState, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  companies: string;
  jobtitles: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    companies: '',
    jobtitles: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here, e.g., sending data to an Azure Function or API
  };

  return (
    <div className="App">
      <header className="App-header">
        <h4>Register in Jobscout</h4>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="companies">Companies: </label>
            <input
              type="text"
              id="companies"
              name="companies"
              placeholder="e.g., Google;Amazon;New Relic;"
              value={formData.companies}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="jobtitles">Job Titles: </label>
            <input
              type="text"
              id="jobtitles"
              name="jobtitles"
              placeholder="e.g., Software Engineer; Senior Software Engineer;"
              value={formData.jobtitles}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Link to="/">
              <button type="button">Back</button>
            </Link>
            <button type="submit">Register</button>
          </div>
        </form>
        <p>
          We are not responsible for any data loss or damage caused by the use
          of this platform.
        </p>
      </header>
    </div>
  );
};

export default Register;