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

    useEffect(apiBack, []);


    return(
        <div className='h-screen'>
            {books.map((book)=>{
                return(
                    <div key={book.id} className='border border-red-600'>
                        <div>{book.title}</div>
                    </div>
                )
            })}
        </div>
    )
}