import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

export default function MyBookPage(){

    const [books, setBooks] = useState([])

    function apiBack(){

        axios.get('http://localhost:3000/booksread')
        .then(response =>{
            setBooks(response.data)
            console.log(response.data)
        })
        .catch(error =>{
            console.log(error)
        })
    }

    function destroyBook(id){
        axios.delete(`http://localhost:3000/booksread/${id}`)
        .then(response =>{
            console.log(response)
        })
        .catch(error =>{
            console.log(error)
        })

        window.location.reload()
    }

    useEffect(apiBack, []);


    return(
        <div className='h-screen flex flex-wrap bg-gradient-to-b from-slate-800  to-slate-600 pt-36'>
            {books.map((book)=>{
                return(
                    <div key={book.id} className='h-1/3 w-1/6 px-3'>
                        <div className='flex justify-center my-3'>
                            <img src={book.image} alt="immagine copertina" />
                        </div>
                        <div className='flex flex-col items-center mb-3'>
                            <div className='text-white'>{book.title}</div>
                            <div className='text-white'>{book.author[0]}</div>
                            <div className='text-white'>{book.pages} pag.</div>
                        </div>
                        <div className='flex justify-center'>
                            <button onClick={()=>destroyBook(book.id)} className='p-2 bg-red-600 text-white rounded-lg'>Rimuovi</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}