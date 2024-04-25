
//---------------------------------------------------- REACT ----------------------------------------------------//


import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './ViewParcela.css';
import backenURL from '../../backend.js';
import axios from 'axios';
//---------------------------------------------------- ASSETS ----------------------------------------------------//

import foto from '../../assets/img.png'
import SpecieIcon from '../../assets/Components/Icons/especie.svg';
import CultivoIcon from '../../assets/Components/Icons/cultivo.svg';
import BiomasaIcon from '../../assets/Components/Icons/biomasa.svg';

//---------------------------------------------------- COMPONENTES ----------------------------------------------------//
import Header from '../../Components/Header/Header.jsx'
import CardInfoTop from '../../Components/CardsInfo/cardTop.jsx'
import Menu from '../../Components/Menu/Menu.jsx'

import TableCepasEdit from '../../Components/Table/TablaEdits/TableCepasEdit.jsx'

import CardInfoTopCepa from '../../Components/CardsInfo/cardTop.jsx'
import TableRutinas from '../../Components/Table/TableRutinas.jsx';
import datos from './datos.json'
import PoligonBuild from '../../Components/Poligon/BuildPoligon.jsx'


import { getDatabase, ref, onValue, off } from 'firebase/database';

function ViewParcela({pid}) {


    const poligon = localStorage.getItem('Poligon');
    const nameParcela = localStorage.getItem('NameParcela');
    const getPID = localStorage.getItem('ParcelaActiva');
    console.log(getPID);

    const navigate = useNavigate();
    const [rutinas, setRutinas] = useState([]);

    const nombre = localStorage.getItem('nombre');
    const email = localStorage.getItem('email');
    const avatar = localStorage.getItem('avatar');
    const token = localStorage.getItem('token');
    const uid = localStorage.getItem('uid');


    const [temperatura, setTemperatura] = useState(0); // Estado para almacenar la temperatura
    const [luz, setLuz] = useState(0); // Estado para almacenar la temperatura
    const [humedad, setHumedad] = useState(0); // Estado para almacenar la temperatura


    useEffect(() => {
        if (!token) {
            navigate('/Login');
        }

        const db = getDatabase();
        const temperaturaRef = ref(db, `Parcelas/${getPID}/Temperatura`);
        const humRef = ref(db, `Parcelas/${getPID}/Humedad`);
        const luzRef = ref(db, `Parcelas/${getPID}/Luz`);

        // Suscribirse a cambios en la temperatura en tiempo real
        const unsubscribe = onValue(temperaturaRef, (snapshot) => {
            const temp = snapshot.val();
            if (temp !== null) {
                console.log('Temperatura:', temp);
                setTemperatura(temp);
            } else {
                console.log('El nodo de temperatura no existe.');
            }
        });

          // Suscribirse a cambios en la temperatura en tiempo real
          const unsubscribeHumedad = onValue(humRef, (snapshot) => {
            const hum = snapshot.val();
            if (hum !== null) {
                console.log('Hum:', hum);
                setHumedad(hum);
            } else {
                console.log('El nodo de temperatura no existe.');
            }
        });

          // Suscribirse a cambios en la temperatura en tiempo real
          const unsubscribeLuz = onValue(luzRef, (snapshot) => {
            const luz = snapshot.val();
            if (luz !== null) {
                console.log('Luz:', luz);
                setLuz(luz);
            } else {
                console.log('El nodo de temperatura no existe.');
            }
        });


        obtenerRutinas();

        // Devolver una función de limpieza para cancelar la suscripción cuando el componente se desmonte
        return () => {
            off(temperaturaRef, 'value', unsubscribe);
        };
    }, [getPID, navigate, token]);

    
    //obtener del backend las cepas del usuario
    const obtenerRutinas = async () => {
        try {
            const response = await axios.get(backenURL + '/agrotech/app/riego');
            // Verificar el código de estado de la respuesta
            if (response.status === 200) {
                // Asignar la respuesta al estado de cepas
                setRutinas(response.data);
                console.log(response.data);
            }
        } catch (error) {
            // Error en la solicitud
            if (error.response) {
                // El servidor ha respondido con un código de estado fuera del rango 2xx
                // Aquí puedes manejar diferentes códigos de estado de error
                if (error.response.status === 401) {
                    // Lógica para el caso de error 400

                } else {
                    // Otros códigos de estado de error
                    Swal.fire({
                        title: 'Error!',
                        text: 'Error en la solicitud',
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    });
                }
            } else {
                // Error sin respuesta del servidor
                console.error('Error al realizar la petición:', error);
                // Manejo de errores, puedes mostrar un mensaje al usuario o realizar otras acciones necesarias
            }
        }
    };


    return (
        <body className='bodyHome'>
            <nav className='navHome'>
                <Menu />
            </nav>
            <main className='mainHome'>
                <header className='headerHome'>
                    <Header titulo="Detalles" nombre={nombre} email={email} avatar={avatar} />
                </header>
                <div className="containerHome">
                    <div className="sectionLeft">
                        <div className="containerCards">
                            <div className="card">
                                <CardInfoTop
                                     value={`${temperatura}°C`}
                                    titulo="Temperatura"
                                    icono={CultivoIcon}
                                />
                            </div>
                            <div className="card">
                                <CardInfoTop
                                    value={`${humedad}%`}
                                    titulo="Humedad"
                                    icono={CultivoIcon}
                                />
                            </div>
                            <div className="card">
                                <CardInfoTop
                                   value={`${luz}%`}
                                    titulo="Iluminación"
                                    icono={CultivoIcon}
                                />
                            </div>

                        </div>
                        <div className="Table">
                            <TableRutinas data={rutinas} />
                        </div>
                        <div className="Table">

                        </div>
                        <div className="separator">
                        </div>


                    </div>
                    <div className="sectionRight">
                        <div className="Graphic">
                            <PoligonBuild Title={nameParcela} Instrucciones={poligon} />
                        </div>
                        <div className="Graphic">

                        </div>
                        <div className="ContainerParameters">
                            <div className="CardParameters">


                            </div>
                            <div className="CardParameters">

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
export default ViewParcela;