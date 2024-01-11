import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [dati, setDati] = useState([])

  //Fetching dei dati
  // function apiBooks(){
  //   fetch("https://www.googleapis.com/books/v1/volumes?q=intitle:l'ombra+del+vento+inauthor=zafon")
  //   .then((res) => res.json())
  //   .then(setDati)
  //   .then(console.log(res))
  // }

  function apiBooks(){
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
  //solo al primo rendering
  useEffect(apiBooks, []);

  return (
    <>
      {dati.map((book)=>{
        return(
          <h1>{book.volumeInfo.title}</h1>
        )
        
      })}
    </>
  )
}

export default App
