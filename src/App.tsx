import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import './App.css' // On peut le garder pour le style global pour l'instant

function App() {
  return (
    <>
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
      
    </>
  )
}

export default App

