import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCards();
  }, []);

  // Fetch all cards
  const fetchCards = async () => {
    try {
      const res = await axios.get('https://fictional-robot-wr7gwgxx4jj6hg9xj-4000.app.github.dev/data');
      setCards(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  // Delete card by ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://fictional-robot-wr7gwgxx4jj6hg9xj-4000.app.github.dev/data/${id}`);
      setCards(cards.filter((card) => card._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="card-container">
      {cards.map((card) => (
        <div key={card._id} className="card">
          <div className="content">
            <div className="row">
              <span className="label">Name</span>
              <span className="value">{card.name}</span>
            </div>
            <div className="row">
              <span className="label">Phone</span>
              <span className="value">{card.phone}</span>
            </div>
            <div className="row">
              <span className="label">Subject</span>
              <span className="value">{card.subject}</span>
            </div>
            <div className="row">
              <span className="label">Description</span>
              <span className="value">{card.description}</span>
            </div>
            <button className="card-btn" onClick={() => handleDelete(card._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;