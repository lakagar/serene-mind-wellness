
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Ensure dark mode is properly initialized
document.documentElement.classList.remove('light', 'dark');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.classList.add(systemPrefersDark ? 'dark' : 'light');

createRoot(document.getElementById("root")!).render(<App />);
