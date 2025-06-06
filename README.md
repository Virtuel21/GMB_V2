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

The frontend expects an endpoint at `/api/businesses` that returns JSON in the following format:

```json
{
  "businesses": [
    { "id": "123", "name": "My Business" }
  ]
}
```

You will need to implement this API route on your server so that it authenticates with Google and forwards your real Google My Business listing data.

## Building for Production

```
npm run build
```

This will output the static files in the `dist` directory.
