import { useState } from 'react';

const IndexPage = () => {
  const [diseaseDescription, setDiseaseDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cures, setCures] = useState([]);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/cures', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: diseaseDescription }),
      });
      const data = await res.json();
      setCures(data);
    } catch (error) {
      console.error('Error fetching cures:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Describe Your Disease</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={diseaseDescription}
          onChange={(e) => setDiseaseDescription(e.target.value)}
          placeholder="Enter description..."
          rows={5}
          cols={50}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Find Cures'}
        </button>
      </form>
      <div>
        {cures.length > 0 && (
          <div>
            <h2>Cures:</h2>
            <ul>
              {cures.map((cure, index) => (
                <li key={index}>{cure}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndexPage;
