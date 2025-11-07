import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'
import Footer from './components/Navigation/Footer/Footer'
import BuilderCV from './components/MasterCV/BuilderCV'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Dashboard />
            <Footer />
          </>
        } />
        <Route path="/master-cv" element={
          <>
            <BuilderCV />
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  )
}

export default App
