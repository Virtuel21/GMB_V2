const express = require('express');
const session = require('express-session');
const { google } = require('googleapis');

const app = express();
const PORT = process.env.PORT || 3000;

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/google/callback'
);

app.use(session({
  secret: process.env.SESSION_SECRET || 'change-me',
  resave: false,
  saveUninitialized: false,
}));

app.get('/auth/google', (_req, res) => {
  const url = oauth2Client.generateAuthUrl({
    scope: ['https://www.googleapis.com/auth/business.manage'],
    access_type: 'offline',
    prompt: 'consent',
  });
  res.redirect(url);
});

app.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).send('Missing code');
  try {
    const { tokens } = await oauth2Client.getToken(code);
    req.session.tokens = tokens;
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Authentication failed');
  }
});

app.get('/api/businesses', async (req, res) => {
  const tokens = req.session.tokens;
  if (!tokens) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  oauth2Client.setCredentials(tokens);
  const myBusiness = google.mybusinessbusinessinformation({ version: 'v1', auth: oauth2Client });
  try {
    const { data } = await myBusiness.accounts.list();
    const accounts = data.accounts || [];
    res.json({ businesses: accounts.map(a => ({ id: a.name, name: a.accountName })) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch businesses' });
  }
});

// Serve static files from dist when in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
  app.get('*', (_req, res) => {
    res.sendFile('index.html', { root: 'dist' });
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
