import {Outlet} from 'react-router-dom';
import HeaderComp from '../components/HeaderComp';
import FooterComp from '../components/FooterComp'

export default function DefaultLayout(){
    return(
        <div className="flex flex-col justify-between">
            <HeaderComp></HeaderComp>
            <Outlet></Outlet>
            <FooterComp></FooterComp>
        </div>
    )
}