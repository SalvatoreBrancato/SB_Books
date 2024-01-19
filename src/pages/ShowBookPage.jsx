import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

export default function ShowBookPage() {

    const { id } = useParams();

    const [book, setBook] = useState()

    function apiBook() {
        axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
            .then(response => {
                // Analizza la risposta
                setBook(response.data.volumeInfo);
                console.log(response.data.volumeInfo)
            })
            .catch(error => {
                // Gestisci gli errori
                console.log(error);
            });
    }

    function addBook() {

        const newBook = {
            title: book.title,
            author: book.authors,
            description: book.description,
            image: book.imageLinks.thumbnail,
            published: book.publishedDate,
            pages: book.pageCount,
            language: book.language
        }
        console.log(newBook)
        axios.post("http://localhost:3000/booksread", newBook, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    useEffect(apiBook, [])

    return (
        <div className=" flex h-screen w-full bg-gradient-to-b from-slate-800  to-slate-600 pt-36">
            {/* lato sinistro */}
            <div className="h-1/2 w-1/3 flex flex-col justify-center items-center">
                <div className="w-full h-2/3 flex justify-center items-center">
                    {book && <img src={book.imageLinks.thumbnail} className="w-1/3" alt="immagine copertina" />}
                </div>
                <div className="w-1/3 h-1/3 flex flex-col items-center mt-10">
                    <div>
                        {book && <div className="text-white">Titolo: {book.title}</div>}
                        {book && <div className="text-white">Autore: {book.authors}</div>}
                        {book && <div className="text-white">Pubblicazione: {book.publishedDate}</div>}
                        {book && <div className="text-white">Pagine: {book.pageCount}</div>}
                        {book && <div className="text-white">Lingua: {book.language}</div>}
                    </div>
                </div>
            </div>

            {/* lato destro */}
            <div className="w-2/3 flex flex-col items-start pr-40">
                {book && <span className="text-white">{book.description}</span>}
                <button className="p-2 bg-green-500 mt-5 text-white rounded" onClick={() => addBook()}>Aggiungi ai miei libri</button>
            </div>
        </div>
    )
}