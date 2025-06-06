import React, { useEffect, useState } from 'react';

interface Business {
  id: string;
  name: string;
}

export default function App() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBusinesses() {
      try {
        // Endpoint expected to return the authenticated user's businesses.
        const resp = await fetch('/api/businesses');
        if (!resp.ok) {
          throw new Error(`API error ${resp.status}`);
        }
        const data = await resp.json();
        setBusinesses(data.businesses ?? []);
      } catch (err) {
        setError((err as Error).message);
      }
    }

    fetchBusinesses();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Google My Business Listings</h1>
      {error && <p className="text-red-600">{error}</p>}
      <ul>
        {businesses.map(b => (
          <li key={b.id}>{b.name}</li>
        ))}
      </ul>
    </div>
  );
}
