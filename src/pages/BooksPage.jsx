import { useState, useEffect } from 'react';
import axios from 'axios';

export default function BooksPage(){
    const [dati, setDati] = useState([])

    const [formData, setFormData] = useState({
      name: '',
      surname:'',
      title: ''
  })

  const [research, setResearch] = useState([])

  const handleInputChange = (e) => {
    const { name, type, value, checked } = e.target
    const inputValue = type == 'checkbox' ? checked : value
    setFormData({
        ...formData,
        [name]: inputValue
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newResearch = {
        name: formData.name,
        surname: formData.surname,
        title: formData.title
    }

    setResearch([...research, newResearch])
    console.log(newResearch)
    
    const url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${newResearch.name}+${newResearch.surname}&intitle:${newResearch.title}&orderBy=newest&maxResults=30`
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${newResearch.name}+${newResearch.surname}&intitle:${newResearch.title}&orderBy=newest&maxResults=40`)
        .then(response => {
          // Analizza la risposta
          setDati(response.data.items);
          console.log(response.data.items)
          console.log(url)
        })
        
        .catch(error => {
          // Gestisci gli errori
          console.log(error);
        });
    
}

    
  
    return (
      <>
        <div className="w-full min-h-screen flex-col items-center bg-gradient-to-b from-slate-800  to-slate-600">
          <form className='flex items-center justify-center h-1/3 my-5 ' onSubmit={handleSubmit}>
            <div className='m-5'>
              <label htmlFor="title" className='text-white'>Titolo: </label>
              <input className='rounded-md' name="title" type="text" value={formData.title} onChange={handleInputChange} />
            </div>
            <div className='m-5'>
              <label htmlFor="name" className='text-white'>Nome autore: </label>
              <input className='rounded-md' name="name" type="text" value={formData.name} onChange={handleInputChange}/>
            </div>
            <div className='m-5'>
              <label htmlFor="surname" className='text-white'>Cognome autore: </label>
              <input className='rounded-md' name="surname" type="text" value={formData.surname} onChange={handleInputChange}/>
            </div>
            <div>
              <button className="px-2 bg-red-500 rounded-md m-5 text-white font-bold" type="submit">Ricerca</button>
            </div>
          </form>
          <div className='min-h-full'>
            {dati.map((book)=>{
              return(book.volumeInfo.imageLinks ? 
                <div key={book.id} className='max-h-[200px] m-5 relative flex'>
                  <img className='' src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail:''} alt="immagine copertina" />
                  <div className='flex flex-col'>
                    <div className='text-white'>Titolo: {book.volumeInfo.title}</div>
                    <div className='text-white'>Autore: {book.volumeInfo.authors}</div>
                    <div className='text-white'>Data pubblicazione: {book.volumeInfo.publishedDate}</div>

                  </div>
                                
                </div> : ''
              )
            })}
          </div>
        </div>
      </>
    )
}