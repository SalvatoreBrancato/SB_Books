import {Link, NavLink} from "react-router-dom";

export default function HeaderComp(){
    return(
        <header className="h-16 bg-slate-800 flex items-center justify-around">
            <div>
                <h1 className="italic font-mono text-5xl text-white">SB_Books</h1>
            </div>
            <div className="flex justify-end w-50 text-white text-xl">
                <Link to="/" className="border-l-4 border-red-600 px-1" >Home</Link>
                <Link className="border-l-4 border-red-600 px-1 mx-2" to='/books'>Books</Link>
            </div>
        </header>
    )
}