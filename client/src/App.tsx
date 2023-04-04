import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./scenes/login"
import HomePage from "./scenes/home"

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
