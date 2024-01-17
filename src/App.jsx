import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultLayout from './pages/DefaultLayout';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import ShowBookPage from './pages/ShowBookPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout/>}>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/books' element={<BooksPage/>}></Route>
            <Route path='/book/:id' element={<ShowBookPage/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
