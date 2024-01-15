import { useState, useEffect } from 'react';
import axios from 'axios';

export default function BooksPage(){
    const [dati, setDati] = useState([])

    function apiBookResearch(){
      axios.get("https://www.googleapis.com/books/v1/volumes?q=intitle:l'ombra+del+vento")
        .then(response => {
          // Analizza la risposta
          setDati(response.data.items);
          console.log(response.data.items[0])
        })
        
        .catch(error => {
          // Gestisci gli errori
          console.log(error);
        });
    }
    
  
    return (
      <>
        <div className="w-full h-full flex justify-center bg-gradient-to-b from-slate-800  to-slate-600">
          <form className='flex items-center h-1/3'>
            <div className='m-5'>
              <label htmlFor="book" className='text-white'>Testo: </label>
              <input name="book" type="text" />
            </div>
            <div className='m-5'>
              <label htmlFor="author" className='text-white'>Autore: </label>
              <input name="author" type="text" />
            </div>
            <div>
              <button className="p-1 bg-red-500 rounded-md m-5 text-white" type="submit">Ricerca</button>
            </div>
          </form>
        </div>
      </>
    )
}