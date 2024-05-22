import React, { useState, useEffect } from 'react';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [randomQuote, setRandomQuote] = useState(null);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [quoteId, setQuoteId] = useState('');

  // Charger une citation aléatoire au démarrage de l'application
  useEffect(() => {
    fetchRandomQuote();
  }, []);

  // Fonction pour charger toutes les citations
  const fetchAllQuotes = () => {
    fetch('http://localhost:5000/quotes')
      .then(response => response.json())
      .then(data => setQuotes(data))
      .catch(error => console.error('Error fetching all quotes:', error));
  };

  // Fonction pour effacer toutes les citations affichées
  const clearAllQuotes = () => {
    setQuotes([]);
  };

  // Fonction pour charger une nouvelle citation aléatoire
  const fetchRandomQuote = () => {
    fetch('http://localhost:5000/quotes/random')
      .then(response => response.json())
      .then(data => setRandomQuote(data))
      .catch(error => console.error('Error fetching random quote:', error));
  };

  // Fonction pour obtenir une citation par ID
  const fetchQuoteById = () => {
    fetch(`http://localhost:5000/quotes/${quoteId}`)
      .then(response => response.json())
      .then(data => setSelectedQuote(data))
      .catch(error => console.error('Error fetching quote by id:', error));
  };

  return (
    <div className="App">
      <h1>Citations</h1>
      <div>
        <h2>Toutes les Citations</h2>
        <button onClick={fetchAllQuotes}>Charger Toutes les Citations</button>
        <button onClick={clearAllQuotes}>Effacer Toutes les Citations</button>
        <ul>
          {quotes.map((quote, index) => (
            <li key={index}>{quote.quote} - {quote.author}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Citation Aléatoire</h2>
        <button onClick={fetchRandomQuote}>Charger une Nouvelle Citation Aléatoire</button>
        <p>{randomQuote ? `${randomQuote.quote} - ${randomQuote.author}` : "Chargement..."}</p>
      </div>

      <div>
        <h2>Chercher Citation par ID</h2>
        <input
          type="text"
          value={quoteId}
          onChange={(e) => setQuoteId(e.target.value)}
          placeholder="Entrez un ID"
        />
        <button onClick={fetchQuoteById}>Chercher</button>
        {selectedQuote && <p>{selectedQuote.quote} - {selectedQuote.author}</p>}
      </div>
    </div>
  );
}

export default App;

/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [randomQuote, setRandomQuote] = useState(null);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [quoteId, setQuoteId] = useState('');

  // Pour charger toutes les citations
  useEffect(() => {
    axios.get('http://localhost:5000/quotes')
      .then(response => setQuotes(response.data))
      .catch(error => console.error('Error fetching quotes:', error));
  }, []);

  // Fonction pour obtenir une citation aléatoire
  const fetchRandomQuote = () => {
    axios.get('http://localhost:5000/quotes/random')
      .then(response => setRandomQuote(response.data))
      .catch(error => console.error('Error fetching random quote:', error));
  };

  // Fonction pour obtenir une citation par ID
  const fetchQuoteById = () => {
    axios.get(`http://localhost:5000/quotes/${quoteId}`)
      .then(response => setSelectedQuote(response.data))
      .catch(error => console.error('Error fetching quote by id:', error));
  };

  return (
    <div className="App">
      <h1>Citations</h1>
      <div>
        <h2>Toutes les Citations</h2>
        <ul>
          {quotes.map((quote, index) => (
            <li key={index}>{quote.quote} - {quote.author}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Citation Aléatoire</h2>
        <button onClick={fetchRandomQuote}>Obtenir Citation Aléatoire</button>
        {randomQuote && <p>{randomQuote.quote} - {randomQuote.author}</p>}
      </div>

      <div>
        <h2>Chercher Citation par ID</h2>
        <input
          type="text"
          value={quoteId}
          onChange={(e) => setQuoteId(e.target.value)}
          placeholder="Entrez un ID"
        />
        <button onClick={fetchQuoteById}>Chercher</button>
        {selectedQuote && <p>{selectedQuote.quote} - {selectedQuote.author}</p>}
      </div>
    </div>
  );
}

export default App;

*/