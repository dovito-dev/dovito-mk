
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Make sure React 18 createRoot API is used
createRoot(document.getElementById("root")!).render(<App />);
