import { useState, useEffect } from 'react';
import axios from 'axios';

export default function HomePage() {

    const [dati, setDati] = useState([])
    const [datiDue, setDatiDue] = useState([])

    // chiamata api I sezione
    function apiBooks(){
      axios.get("https://www.googleapis.com/books/v1/volumes?q=inauthor:stephen+king&orderBy=newest&maxResults=30")
        .then(response => {
          // Analizza la risposta
          setDati(response.data.items);
           console.log(response.data.items)
        })
        .catch(error => {
          // Gestisci gli errori
          console.log(error);
        });
    }

    //chiamata api II sezione
    function apiBooksDue(){
      axios.get("https://www.googleapis.com/books/v1/volumes?q=inauthor:glenn+cooper&orderBy=newest&maxResults=30")
        .then(response => {
          // Analizza la risposta
          setDatiDue(response.data.items);
           console.log(response.data.items)
        })
        .catch(error => {
          // Gestisci gli errori
          console.log(error);
        });
    }
    
    //solo al primo rendering
    useEffect(apiBooks, []);
    useEffect(apiBooksDue, []);

    return (
      <>
      <div className="w-full h-full flex flex-col justify-end  bg-gradient-to-b from-slate-800  to-slate-600">
        {/* I sezione */}
        <div className='flex overflow-x-auto flex-nowrap'>
          {dati.map((book)=>{
            return(book.volumeInfo.imageLinks ? 
              <div key={book.id} className='min-w-36 max-h-[200px] m-5 relative' >
                <img className='w-full h-full' src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail:''} alt="immagine copertina" />
                <div className='absolute inset-x-0 inset-y-0 hidden hover:block'>
                  <div className='text-white'>Titolo: {book.volumeInfo.title}</div>
                  <div className='text-white'>Autore: {book.volumeInfo.authors}</div>
                </div>              
              </div> : ''
            )
          })}
        </div>
        {/* II sezione */}
        <div className='flex overflow-x-auto flex-nowrap'>
          {datiDue.map((book)=>{
            return(book.volumeInfo.imageLinks ? 
              <div key={book.id} className='min-w-36 max-h-[200px] m-5 relative' >
                <img className='w-full h-full' src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail:''} alt="immagine copertina" />
                <div className='absolute inset-x-0 inset-y-0 hidden hover:block'>
                  <div className='text-white'>Titolo: {book.volumeInfo.title}</div>
                  <div className='text-white'>Autore: {book.volumeInfo.authors}</div>
                </div>              
              </div> : ''
            )
          })}
        </div>
      </div>
      </>);
  }