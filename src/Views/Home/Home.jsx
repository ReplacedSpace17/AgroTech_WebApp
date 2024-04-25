
//---------------------------------------------------- REACT ----------------------------------------------------//
import datos from './tabla.json'
import cultivosData from './tablaCultivos.json'
import biomasaData from './biomasa.json'
import './home.css'

import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

//---------------------------------------------------- ASSETS ----------------------------------------------------//

import foto from '../../assets/img.png'
import SpecieIcon from '../../assets/Components/Icons/especie.svg';
import CultivoIcon from '../../assets/Components/Icons/cultivo.svg';
import BiomasaIcon from '../../assets/Components/Icons/biomasa.svg';

//---------------------------------------------------- COMPONENTES ----------------------------------------------------//
import Header from '../../Components/Header/Header.jsx'
import CardInfoTop from '../../Components/CardsInfo/cardTop.jsx'
import Menu from '../../Components/Menu/Menu.jsx'
import Table from '../../Components/Table/Table.jsx'
import TableCultivos from '../../Components/Table/TableCultivos.jsx'

import LineChartComponent from '../../Components/Graphics/Line.jsx';
import DonutChartComponent from '../../Components/Graphics/Pastel.jsx';

import CardBottomCultivo from '../../Components/CardCultivos/CardBottomCultivo.jsx'
import CardBottomParametros from '../../Components/CardCultivos/CardBottomParametros.jsx';

import axios from 'axios';

function Home() {

    const navigate = useNavigate();

    const nombre = localStorage.getItem('nombre');
    const email = localStorage.getItem('email');
    const avatar = localStorage.getItem('avatar');
    const token = localStorage.getItem('token');
    const uid = localStorage.getItem('uid');    

    useEffect(() => {

        console.log(uid);

        /*
                if (!token) {
                    // Si no hay token, redirigir al usuario a la página de inicio de sesión
                    navigate('/Login');
                }
                // Si no hay token, redirigir al usuario a la página de inicio de sesión
       */ 

    }, [navigate]);

    return (
        <body className='bodyHome'>
            <nav className='navHome'>
                <Menu />
            </nav>
            <main className='mainHome'>
                <header className='headerHome'>
                    <Header titulo= "Inicio" nombre={nombre} email={email} avatar={avatar} />
                </header>
                <div className="containerHome">
                    <div className="sectionLeft">
                        <div className="containerCards">
                            <div className="card">
                                <CardInfoTop
                                    value="5"
                                    titulo="Especies"
                                    icono={SpecieIcon}
                                />
                            </div>
                            <div className="card">
                                <CardInfoTop
                                    value="5"
                                    titulo="Cultivos"
                                    icono={CultivoIcon}
                                />
                            </div>
                            <div className="card">
                                <CardInfoTop
                                    value="5"
                                    titulo="Biomasa (gr)"
                                    icono={BiomasaIcon}
                                />
                            </div>

                        </div>
                        <div className="Table">
                            <Table data={datos} />
                        </div>
                        <div className="Table">
                            <TableCultivos data={cultivosData} />
                        </div>
                        <div className="separator">
                        </div>


                    </div>
                    <div className="sectionRight">
                        <div className="Graphic">
                            <DonutChartComponent 
                            Title="Tipo de Microalga"
                            aguaDulceValue={50}
                            aguaSaladaValue={50}
                            />
                        </div>
                        <div className="Graphic">
                        <LineChartComponent data={biomasaData} />
                        </div>
                        <div className="ContainerParameters">
                            <div className="CardParameters">
                                <CardBottomCultivo 
                                especie="Value"
                                origen="Value"
                                medio="Value"
                                />

                            </div>
                            <div className="CardParameters">
                                <CardBottomParametros 
                                iluminacion="Value"
                                temperatura="Value"
                                ph="Value"
                                />
                            </div>
                        </div>
                        <div className="separator">

                        </div>


                    </div>
                </div>
            </main>
        </body>
    );
}
export default Home;