import { useState } from 'react'
import './App.css'
import './index.css'
import Header from './components/header'
import Container from './components/container'
import Footer from './components/footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
    <Container/>
    <Footer/>
    </>
  )
}

export default App
