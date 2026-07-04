import { StrictMode } from 'react'
import { createRoot ,BrowseRouter} from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowseRouter>
      <App />
    </BrowseRouter>
  </StrictMode>,
)
