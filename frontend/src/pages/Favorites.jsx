import { useEffect, useState } from 'react';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const res = await fetch('http://localhost:5050/api/words?isFavorite=true', {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setFavorites(data);
      } else {
        console.error('Failed to fetch favorites');
      }
    } catch (err) {
      console.error('Error fetching favorites:', err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">⭐ Favorite Words</h1>

      {favorites.length === 0 ? (
        <p className="text-center">You haven't marked any words as favorites yet.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {favorites.map((word) => (
            <div key={word._id} className="col">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <h5 className="card-title d-flex justify-content-between align-items-center">
                    <span>{word.word}</span> 
                  </h5>
                  <p className="card-text">{word.definition}</p>
                  <p className="text-muted mb-0">
                    <small>{word.language} | {word.type}</small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
