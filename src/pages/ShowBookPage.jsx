import { useState, useEffect } from "react";
import { Navigate, useNavigate ,useParams } from "react-router-dom";
import axios from 'axios'

export default function ShowBookPage(){

    const {id} = useParams();

    const [book, setBook] = useState()

    function apiBook(){
        axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
          .then(response => {
            // Analizza la risposta
            setBook(response.data);
             console.log(response.data)
          })
          .catch(error => {
            // Gestisci gli errori
            console.log(error);
          });
      }

      useEffect(apiBook, [])

    return(
        <div className="">
           
                <h1>{book.volumeInfo.title}</h1>
            
        </div>
    )
}