import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n' // ⚠️ i18n integration: Initialize i18n before app startup

createRoot(document.getElementById("root")!).render(<App />);
