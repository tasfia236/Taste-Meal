import Header from './components/Header'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Random from './pages/Random'
import Favorites from './pages/Favorites'
import HeroSlider from './components/HeroSlider'

const App = () => {
  return (
    <Router>
      <div className='flex flex-col bg-gray-50 min-h-screen'>
        <Navbar />
        <main className='flex-grow mx-auto w-full max-w-full'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/random' element={<Random />} />
            <Route path='/favorite' element={<Favorites />} />
            <Route
              path='*'
              element={
                <p className='text-red-500 text-center'>404 - Not Found</p>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
