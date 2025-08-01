import { useEffect, useState } from 'react';

function Vocabulary() {
  const [words, setWords] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    word: '',
    definition: '',
    type: '',
    language: '',
    isFavorite: false,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  const languages = ['All','Chinese', 'English', 'French','Japanese', 'Portuguese', 'Spanish', 'Other'];

  // Fetch all words
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/words`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setWords(data));
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/words/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (res.ok) {
      setWords(words.filter((w) => w._id !== id));
    } else {
      console.error('Failed to delete word');
    }
  };

  const handleEditClick = (word) => {
    setEditingId(word._id);
    setEditFormData({
      word: word.word,
      definition: word.definition,
      type: word.type,
      language: word.language,
      isFavorite: word.isFavorite || false,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/words/${editingId}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editFormData),
    });

    if (res.ok) {
      const updatedWord = await res.json();
      setWords(words.map((w) => (w._id === editingId ? updatedWord : w)));
      setEditingId(null);
    } else {
      console.error('Failed to update word');
    }
  };

  const toggleFavorite = async (word) => {
    const updated = { ...word, isFavorite: !word.isFavorite };
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/words/${word._id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isFavorite: updated.isFavorite }),
    });

    if (res.ok) {
      setWords(words.map((w) => (w._id === word._id ? updated : w)));
    } else {
      console.error('Failed to toggle favorite');
    }
  };

  // Filtered list based on search and language
  const filteredWords = words.filter((word) => {
    const matchesSearch = word.word.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = selectedLanguage === 'All' || word.language === selectedLanguage;
    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Vocabulary List</h1>

      {/* Search and Filter */}
      <div className="d-flex justify-content-center align-items-center gap-3 mb-4">
        <input
          type="text"
          className="form-control"
          style={{ width: '200px' }}
          placeholder="Search words..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="form-select"
          style={{ width: '200px' }}
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>

      {/* Word Cards */}
      {filteredWords.length === 0 ? (
        <p className="text-center">No matching words found.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredWords.map((word) => (
            <div key={word._id} className="col">
              <div className="card shadow-sm h-100 border-0">
                <div className="card-body">
                  {editingId === word._id ? (
                    <form onSubmit={handleEditSubmit}>
                      <div className="mb-2">
                        <input
                          type="text"
                          name="word"
                          className="form-control"
                          value={editFormData.word}
                          onChange={handleEditChange}
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <textarea
                          name="definition"
                          className="form-control"
                          value={editFormData.definition}
                          onChange={handleEditChange}
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="text"
                          name="type"
                          className="form-control"
                          value={editFormData.type}
                          onChange={handleEditChange}
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="text"
                          name="language"
                          className="form-control"
                          value={editFormData.language}
                          onChange={handleEditChange}
                          required
                        />
                      </div>
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="isFavorite"
                          id={`favorite-${word._id}`}
                          checked={editFormData.isFavorite}
                          onChange={handleEditChange}
                        />
                        <label className="form-check-label" htmlFor={`favorite-${word._id}`}>
                          Favorite
                        </label>
                      </div>
                      <div className="d-flex justify-content-end gap-2">
                        <button type="submit" className="btn btn-success btn-sm">Save</button>
                        <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditingId(null)}>Cancel</button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <h5 className="card-title d-flex justify-content-between align-items-center">
                        <span>{word.word}</span>
                        {word.isFavorite && <span className="text-warning fs-5">★</span>}
                      </h5>
                      <p className="card-text">{word.definition}</p>
                      <p className="text-muted mb-2">
                        <small>{word.language} | {word.type}</small>
                      </p>
                      <div className="d-flex flex-wrap gap-2">
                        <button className="btn btn-outline-primary btn-sm" onClick={() => handleEditClick(word)}>
                          Edit
                        </button>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(word._id)}>
                          Delete
                        </button>
                        <button
                          className={`btn btn-sm ${word.isFavorite ? 'btn-warning' : 'btn-outline-warning'}`}
                          onClick={() => toggleFavorite(word)}
                        >
                          {word.isFavorite ? '★ Unfavorite' : '☆ Favorite'}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Vocabulary;
