import { useState, useEffect } from 'react';
import axios from 'axios';

export default function HomePage() {

    const [dati, setDati] = useState([])

    function apiBooks(){
      axios.get("https://www.googleapis.com/books/v1/volumes?q=intitle:l'ombra+del+vento")
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
    
    //solo al primo rendering
    useEffect(apiBooks, []);

    return (
      <>
      <div className="w-screen  bg-gradient-to-b from-slate-800  to-slate-600 h-full">
        <div className='h-full flex justify-around items-end snap-x'>
          {/* <div>{dati.items.volume}</div> */}
          {dati.map((book)=>{
            return(
              <div key={book.id}>
                <img src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail:''} alt="" />              
                <div className='text-white'>{book.volumeInfo.title}</div>
              </div>
            )
          })}
        </div>
      </div>
      </>);
  }