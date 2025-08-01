import { useState } from 'react';

function Form({ onWordAdded }) {
  const [formData, setFormData] = useState({
    word: '',
    definition: '',
    type: '',
    language: '',
    isFavorite: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/words`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const newWord = await res.json();
      if (onWordAdded) onWordAdded(newWord);
      setFormData({
        word: '',
        definition: '',
        type: '',
        language: '',
        isFavorite: false,
      });
    } else {
      console.error('Failed to add word');
    }
};

  return (
    <form onSubmit={handleSubmit} className="container mt-4 p-4 border rounded" style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2 className="mb-4 text-center">What’re we learning today?</h2>
      <div className="mb-3 row">
        <label htmlFor="inputWord" className="col-sm-3 col-form-label">Word</label>
        <div className="col-sm-9">
          <input
            type="text"
            className="form-control"
            id="inputWord"
            name="word"
            value={formData.word}
            onChange={handleChange}
            placeholder="Enter word"
            required
          />
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="inputDefinition" className="col-sm-3 col-form-label">Definition</label>
        <div className="col-sm-9">
          <textarea
            className="form-control"
            id="inputDefinition"
            name="definition"
            value={formData.definition}
            onChange={handleChange}
            placeholder="Enter definition"
            rows="3"
            required
          />
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="inputType" className="col-sm-3 col-form-label">Type</label>
        <div className="col-sm-9">
          <select
            id="inputType"
            name="type"
            className="form-select"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select type</option>
            <option value="Noun">Noun</option>
            <option value="Verb">Verb</option>
            <option value="Adjective">Adjective</option>
            <option value="Greetings">Greetings</option>
            <option value="Phrase">Phrase</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="inputLanguage" className="col-sm-3 col-form-label">Language</label>
        <div className="col-sm-9">
          <select
            id="inputLanguage"
            name="language"
            className="form-select"
            value={formData.language}
            onChange={handleChange}
            required
          >
            <option value="">Select language</option>
            <option value="Chinese">Chinese</option>
            <option value="English">English</option>
            <option value="French">French</option>
            <option value="Japanese">Japanese</option>
            <option value="Portuguese">Portuguese</option>
            <option value="Spanish">Spanish</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary">Add Word</button>
      </div>
    </form>
  );
}

export default Form;
