import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ViewportManager from './components/globalComponents/ViewportManager'

createRoot(document.getElementById("root")!).render(
  <ViewportManager enableDynamicViewport={true}>
    <App />
  </ViewportManager>
);
