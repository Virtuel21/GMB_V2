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
        if (resp.status === 401) {
          throw new Error('Not authenticated');
        }
        if (!resp.ok) {
          throw new Error(`API error ${resp.status}`);
        }

        const contentType = resp.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          const text = await resp.text();
          throw new Error(`Invalid JSON response: ${text.slice(0, 100)}`);
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
      {error && (
        <p className="text-red-600">
          {error}
          {error === 'Not authenticated' && (
            <> - <a className="underline" href="/auth/google">Connect Google</a></>
          )}
        </p>
      )}
      <ul>
        {businesses.map(b => (
          <li key={b.id}>{b.name}</li>
        ))}
      </ul>
    </div>
  );
}
