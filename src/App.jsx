import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
// import {Button} from './components/ui/button.jsx'
import './App.css'



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<div>Home</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
