import React from 'react';
import './header.css';
import logo from '../../assets/logoMenu.svg'
import home from '../../assets/icons/homeIcon.svg'
import perfil from '../../assets/icons/perfilIcon.svg'
import cultivos from '../../assets/icons/cultivosIcon.svg'
import gaia from '../../assets/icons/iaIcon.svg'
import stats from '../../assets/icons/statsIcon.svg'
import salir from '../../assets/img.png'

function Header({ titulo = "Título ", foto, nombre }) {
    
    return (
        <div className="containerHeader">
            <div className="contentIZQUIERDA">
                <h1 className= 'tituloHeader'>{titulo}</h1>
                <div className="contentCorreo"><p className= 'txtCorreoHeader'>replacedspace17@gmail.com</p></div>
            </div>
            <div className="contentDERECHA">
                <img className= 'imgProfileHeader' src={foto}></img>
                <p className='nombreHeader'>{nombre}</p>
            </div>
        </div>
    );
}

export default Header;
