import { defineConfig, type Plugin, type ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';

function mockBusinesses(): Plugin {
  return {
    name: 'mock-businesses',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/api/businesses', (_req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(
          JSON.stringify({
            businesses: [{ id: '123', name: 'Demo Business' }],
          }),
        );
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mockBusinesses()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
