import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'serve-kedro-data',
      configureServer(server) {
        server.middlewares.use('/api', (req, res, next) => {
          // req.url va a ser algo como "/rep_growth_metrics.json"
          const fileName = req.url.split('?')[0].slice(1);
          const filePath = path.resolve(__dirname, '../backend/data/08_reporting', fileName);
          
          if (fs.existsSync(filePath)) {
            res.setHeader('Content-Type', 'application/json');
            res.end(fs.readFileSync(filePath));
          } else {
            next();
          }
        });
      }
    }
  ]
})
