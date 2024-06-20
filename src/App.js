import React, { useState } from 'react';
import './App.css';
import { sendMsgToHuggingFace } from './openai';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    if (searchQuery.trim() === '') return;

    try {
      const result = await sendMsgToHuggingFace(searchQuery);
      console.log('Response data:', result); // Log the response data
      setResponse(result.trim());
    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred while generating the response.');
    }

    setSearchQuery('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src="logo.png" alt="Logo" className="App-logo" />
        <h2 className="welcome-text">LLM Model 3</h2>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="search-input"
          />
          <button type="submit" className="search-button"></button>
        </form>
      </header>
      <div className="output-section">
        <h3 className="output-title">Model Output:</h3>
        <div className="output-box">
          <p className="output-text">{response}</p>
        </div>
      </div>
    </div>
  );
}

export default App;