// Optimized React + Vite template for WebContainer
// Minimal dependencies + npm config for faster installs

export const REACT_TEMPLATE = `<boltArtifact id="project-import" title="Project Files"><boltAction type="file" filePath=".npmrc">registry=https://registry.npmjs.org/
prefer-offline=true
progress=true
loglevel=verbose
fund=false
audit=false
</boltAction><boltAction type="file" filePath="package.json">{
  "name": "react-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --host"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0"
  }
}
</boltAction><boltAction type="file" filePath="vite.config.js">import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
</boltAction><boltAction type="file" filePath="index.html"><!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
</boltAction><boltAction type="file" filePath="src/main.jsx">import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
</boltAction><boltAction type="file" filePath="src/App.jsx">import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif',
      background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
      color: '#fff'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        🚀 React + Vite
      </h1>
      <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
        Start prompting to build something amazing!
      </p>
      <button 
        onClick={() => setCount(c => c + 1)}
        style={{
          padding: '12px 32px',
          fontSize: '1rem',
          background: '#646cff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'background 0.2s'
        }}
      >
        Count: {count}
      </button>
    </div>
  );
}

export default App;
</boltAction></boltArtifact>`;

export const NODE_TEMPLATE = REACT_TEMPLATE;
