import { useState, useEffect } from "react";
import { Navigate, useNavigate ,useParams } from "react-router-dom";
import axios from 'axios';

export default function ShowBookPage(){

    const {id} = useParams();

    const [book, setBook] = useState()

    function apiBook(){
        axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
          .then(response => {
            // Analizza la risposta
            setBook(response.data.volumeInfo);
            console.log(book)
          })
          .catch(error => {
            // Gestisci gli errori
            console.log(error);
          });
      }

      useEffect(apiBook, [])

    return(
        <div className=" flex h-screen w-full bg-gradient-to-b from-slate-800  to-slate-600 pt-36">
            {/* lato sinistro */}
           <div className="h-1/2 w-1/3 flex flex-col justify-center items-center">
                <div className="w-full h-2/3 flex justify-center items-center">
                    {/* <img src={book.imageLinks.thumbnail} className="" alt="immagine copertina" /> */}
                </div>
                <div className="w-full h-1/3 flex flex-col items-center">
                    {/* <div className="text-white">Titolo: {book.title}</div>
                    <div className="text-white">Autore: {book.authors}</div>
                    <div className="text-white">Pubblicazione: {book.publishedDate}</div>
                    <div className="text-white">Pagine: {book.pageCount}</div>
                    <div className="text-white">Lingua: {book.language}</div>                     */}
                </div>
           </div>

            {/* lato destro */}
           <div className="w-2/3 flex flex-col items-start pr-40">
                {/* <span className="text-white">{book.description}</span> */}
            </div>   
        </div>
    )
}