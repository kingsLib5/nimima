import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Slideshow from './Slideshow'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Slideshow/>
  </StrictMode>,
)
