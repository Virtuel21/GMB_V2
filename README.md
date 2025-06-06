# GMB Dashboard

This project is a very small Vite + React setup intended to display data from the Google My Business API.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the dev server:
   ```bash
   npm run dev
   ```

3. In a separate terminal, start the API server:
   ```bash
   GOOGLE_CLIENT_ID=your_client_id \
   GOOGLE_CLIENT_SECRET=your_client_secret \
   SESSION_SECRET=some_secret \
   npm run server
   ```

   Replace the `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` with values from
   your Google Cloud OAuth credentials. After starting the server, visit
   `http://localhost:3000/auth/google` to connect your Google account. Once
   authenticated, `/api/businesses` will return your real Business Profile
   listings.

The frontend expects an endpoint at `/api/businesses` that returns JSON in the following format:

```json
{
  "businesses": [
    { "id": "123", "name": "My Business" }
  ]
}
```

The included Express server provides a placeholder implementation of `/api/businesses`.
You can modify `server.js` to authenticate with Google and forward your real Google My Business listing data.

## Building for Production

```
npm run build
```

This will output the static files in the `dist` directory.
