import {useState, useEffect} from 'react';
import axios from 'axios';


export default function MyBookPage(){

    const [books, setBooks] = useState([])

    //totale pagine lette
    const [totalPages, setTotalPage] = useState([])
    let totalPagesRead = 0
    //totale libri letti
    const totalBooks = books.length

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

    //calcola il totale delle pagine dei libri letti
    function calculatesTotalPage(){
        books.forEach((booksPage)=>{
          totalPagesRead += booksPage.pages  
        })
        setTotalPage(totalPagesRead)   
    }

    function destroyBook(id){
        axios.delete(`http://localhost:3000/booksread/${id}`)
        .then(response =>{
            console.log(response)
        })
        .catch(error =>{
            console.log(error)
        })

        //ricarica l pagina dopo aver eliminato l'elemento
        window.location.reload()
    }

    useEffect(apiBack, []);
    useEffect(calculatesTotalPage)


    return(
        <div className='min-h-screen bg-gradient-to-b from-slate-800  to-slate-600 pt-36'>
            <div className='text-white ms-10'>Libri letti: {totalBooks}</div>
            <div className='text-white ms-10'>Pagine lette: {totalPages}</div>
            <div className='flex flex-wrap'>
            {books.map((book)=>{
                return(
                    <div key={book.id} className='h-1/3 w-1/6 px-3 mb-10'>
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
            
        </div>
    )
}