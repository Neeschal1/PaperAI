import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SignupScreen from './screens/signup/signup.jsx'
import PDFAssistant from './screens/pdf/uploadpdf.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <SignupScreen /> */}
    <PDFAssistant />
  </StrictMode>,
)
