import { useState } from 'react'
import './App.css'
import Header from './components/Header';
import MovieList from './components/MovieList';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="App">
      <Header/>
      <MovieList/>
      <Footer/>
    </div>
  )
}

export default App
