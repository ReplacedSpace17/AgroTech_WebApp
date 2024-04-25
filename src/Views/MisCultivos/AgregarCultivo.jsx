import React, { useState, useRef, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import foto from '../../assets/img.png'
import SpecieIcon from '../../assets/Components/Icons/especie.svg';
import CultivoIcon from '../../assets/Components/Icons/cultivo.svg';
import BiomasaIcon from '../../assets/Components/Icons/biomasa.svg';
import Header from '../../Components/Header/Header.jsx'
import CardInfoTop from '../../Components/CardsInfo/cardTop.jsx'
import Menu from '../../Components/Menu/Menu.jsx'

import Swal from 'sweetalert2';
import axios from 'axios';
import backenURL from '../../backend.js';

// import { app } from '../../firebase.js'; // Importa las funciones necesarias de firebase.js
import { getDatabase, ref, set, push } from 'firebase/database';

import './styleDraw.css';

function AgregarCultivo() {

    //const database = app.database();


    const [cepas, setCepas] = useState([]);

    const navigate = useNavigate();
    const nombre = localStorage.getItem('nombre');
    const email = localStorage.getItem('email');
    const avatar = localStorage.getItem('avatar');
    const token = localStorage.getItem('token');
    const uid = localStorage.getItem('uid');
    // Definimos los estados para los valores seleccionados
    const [especie, setEspecie] = useState('');
    const [tipo, setTipo] = useState('');

    const [currentVertices, setCurrentVertices] = useState([]);
    const [parcelas, setParcelas] = useState([]);
    const [coordenadasPoligono, setCoordenadasPoligono] = useState([]);
    const canvasRef = useRef(null);




    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const drawParcelas = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            parcelas.forEach((vertices) => {
                drawPolygon(ctx, vertices);
            });

            if (currentVertices.length > 1) {
                drawPolygon(ctx, currentVertices);
            }
        };

        drawParcelas();
        
    }, [currentVertices, parcelas]);










    // Función para manejar el envío del formulario
    const handleFormSubmit = (e) => {

        if (currentVertices.length > 1) {
            setParcelas([...parcelas, currentVertices]);
            setCoordenadasPoligono(currentVertices); // Guardar las coordenadas del polígono
            setCurrentVertices([]);
        }


        e.preventDefault();
        // construir el formData con los valores del formulario cepa_id, user_id, nombre, motivo 
        const formData = {
            Etiqueta: e.target[0].value,
            Instrucciones: coordenadasPoligono.map(vertex => `(${vertex.x}, ${vertex.y})`).join(", "),
            UID: uid
        }
        console.log(formData);

        //validar que los campos no esten vacios
        if (formData.nombre === '' || formData.Instrucciones === '' || formData.UID === '') {
            Swal.fire({
                title: 'Cargando!',
                text: 'cargando, enviar nuevamente por favor',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        console.log(formData);

         InsertarNuevoCultivo(formData);

    };

    const regresar = () => {
        navigate('/MisCultivos');
    };


    const createCultivoFirebase = (UID, CID, nombreCultivo) => {



        // Obtener una referencia a la base de datos de Firebase
        const db = getDatabase();
        // Referencia al nodo específico en la base de datos donde deseas escribir los datos
        const cultivoRef = ref(db, 'BioharvestApp/Usuarios/' + UID + '/Fotobiorreactores/' + CID);
        // Datos que deseas almacenar en el nodo del cultivo
        const cultivoData = {
            NombreCultivo: nombreCultivo
        };

        // Intentar establecer los datos en la base de datos
        set(cultivoRef, cultivoData)
            .then(() => {
                console.log('Datos del cultivo escritos correctamente.');
            })
            .catch((error) => {
                console.error('Error al escribir datos del cultivo:', error);
                // Manejar el error, puedes mostrar un mensaje al usuario o realizar otras acciones necesarias
            });

        //createFotoBiorreactor(UID, "sxnxj");
    };

    const InsertarNuevoCultivo = async (formData) => {
        try {
            const response = await axios.post(backenURL + '/agrotech/app/parcela', formData);
            // Verificar el código de estado de la respuesta
            if (response.status === 201) {
                //Mostrar un swal para indicar que la cepa ha sido agregada exitosamente y despues redirigir al usuario a la vista de MisCepas
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'Se ha creado exitosamente',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    //obtener el response.data.cultivo_id y redirigir al usuario a la vista de MisCepas
                    const idCultivo = response.data.parcela_id;
                    // Establecer el ID del cultivo en el almacenamiento local
                    

                    localStorage.setItem('newCultivoId', idCultivo);
                    
                    //crear el bucket en firebase
                    //createBucket(uid, idCultivo);
                    console.log(idCultivo);
                    //crear un bucken en firebase para el cultivo con el id
                    //createCultivoFirebase(uid, idCultivo, nombreCultivo);
                    navigate('/MisCultivos');
                });
                
            }
        } catch (error) {
            // Error en la solicitud
            if (error.response) {
                // El servidor ha respondido con un código de estado fuera del rango 2xx
                // Aquí puedes manejar diferentes códigos de estado de error
                if (error.response.status === 401) {
                    // Lógica para el caso de error 400
                    Swal.fire({
                        title: 'Error!',
                        text: 'Las credenciales son inválidas',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
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





    const drawPolygon = (ctx, vertices) => {
        ctx.beginPath();
        ctx.moveTo(vertices[0].x, vertices[0].y);

        for (let i = 1; i < vertices.length; i++) {
            ctx.lineTo(vertices[i].x, vertices[i].y);
        }

        ctx.closePath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#007bff';
        ctx.stroke();

        vertices.forEach((vertex) => {
            ctx.beginPath();
            ctx.arc(vertex.x, vertex.y, 4, 0, 2 * Math.PI);
            ctx.fillStyle = '#007bff';
            ctx.fill();
        });
    };

    const handleCanvasClick = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const newVertex = { x, y };

        if (!doesIntersect(currentVertices, newVertex)) {
            setCurrentVertices([...currentVertices, newVertex]);
        }
    };

    const doesIntersect = (vertices, newVertex) => {
        if (vertices.length < 2) {
            return false;
        }

        const n = vertices.length;
        const x3 = newVertex.x;
        const y3 = newVertex.y;

        for (let i = 0; i < n - 1; i++) {
            const x1 = vertices[i].x;
            const y1 = vertices[i].y;
            const x2 = vertices[i + 1].x;
            const y2 = vertices[i + 1].y;

            if (doSegmentsIntersect(x1, y1, x2, y2, x3, y3)) {
                return true;
            }
        }

        return false;
    };

    const doSegmentsIntersect = (x1, y1, x2, y2, x3, y3) => {
        const dx1 = x2 - x1;
        const dy1 = y2 - y1;
        const dx2 = x3 - x1;
        const dy2 = y3 - y1;
        const dx3 = x2 - x3;
        const dy3 = y2 - y3;

        const crossProduct1 = dx1 * dy2 - dy1 * dx2;
        const crossProduct2 = dx1 * dy3 - dy1 * dx3;

        if ((crossProduct1 >= 0 && crossProduct2 >= 0) || (crossProduct1 <= 0 && crossProduct2 <= 0)) {
            return false;
        }

        const crossProduct3 = dx3 * dy2 - dy3 * dx2;
        const crossProduct4 = dx3 * dy1 - dy3 * dx1;

        if ((crossProduct3 >= 0 && crossProduct4 >= 0) || (crossProduct3 <= 0 && crossProduct4 <= 0)) {
            return false;
        }

        return true;
    };

    const handleFinishDrawing = () => {
        if (currentVertices.length > 1) {
            setParcelas([...parcelas, currentVertices]);
            setCoordenadasPoligono(currentVertices); // Guardar las coordenadas del polígono
            setCurrentVertices([]);
        }

        mostrarCoordenadas();
    };

    const mostrarCoordenadas = () => {
        if (coordenadasPoligono.length > 0) {
            const formattedCoordinates = coordenadasPoligono.map(vertex => `(${vertex.x}, ${vertex.y})`).join(", ");
            alert(`Coordenadas del polígono: ${formattedCoordinates}`);
        }
    };










    return (
        <body className='bodyHome'>
            <nav className='navHome'>
                <Menu />
            </nav>
            <main className='mainHome'>
                <header className='headerHome'>
                    <Header titulo="Mis cultivos" nombre={nombre} email={email} avatar={avatar} />
                </header>
                <div className="containerAgregarCepas">

                    <div className="containerFormAddCepa">
                        <h1 className="titleAddCepa">Crear nueva parcela</h1>
                        <p className="textAddCepa">Por favor ingresa la información</p>
                        <form className="formAddCepa" onSubmit={handleFormSubmit}>
                            <div className="containerInputAddCepa">
                                <p className='textInput'>Nombre de la parcela</p>
                                <input type="text" placeholder="Nombre del cultivo" className="inputAddCepa" />
                            </div>

                            <p>Haz clic en el área para agregar vértices y construir tu polígono.</p>
                            <div className="canvas-container">
                                <canvas
                                    ref={canvasRef}
                                    width="340"
                                    height="200"
                                    className="cultivo-canvas"
                                    onClick={handleCanvasClick}
                                />
                            </div>
                            


                            <div className="containerBtnFormAddCepa">
                                <button className="btnFormAddCepa" id='cancelar' onClick={regresar}>Cancelar</button>
                                <button type="submit" className="btnFormAddCepa" id='aceptar'>Continuar</button>

                            </div>
                        </form>

                    </div>
                </div>
            </main>
        </body>
    );
}

export default AgregarCultivo;


/*

no sirve



 const createBucket = (UID, FID) => {
        // Obtener una referencia a la base de datos de Firebase
        const db = getDatabase();
    
        // Referencia al nodo del usuario utilizando el UID proporcionado
        const usuarioRef = ref(db, 'BioharvestApp/Usuarios/'+UID);
    
        // Datos del fotobiorreactor
        const fotobiorreactorData = {
            Informacion: {
                Nombre: "MiPrimerFotobiorreactor",
                Especie: "Spirulina"
            },
            Control_IA: false,
            Parameters: {
                CicloDiaNoche: false,
                LightIntensity: 0,
                Ph: 0,
                Temperature: 0,
            },
            Sensors: {
                ldr: 0,
                ph: 0,
                temperature: 0
            },
            Switches: {
                Bomba: false,
                Luz: false,
                Calentador: false
            }
        };
    
        // Referencia al nodo de fotobiorreactores utilizando el FID proporcionado
        const fotobiorreactorRef = ref(usuarioRef, 'Fotobiorreactores/'+FID);
    
        // Intentar establecer los datos del fotobiorreactor en la base de datos
        set(fotobiorreactorRef, fotobiorreactorData)
            .then(() => {
                console.log('Datos del fotobiorreactor escritos correctamente.');
            })
            .catch((error) => {
                console.error('Error al escribir datos del fotobiorreactor:', error);
                // Manejar el error, puedes mostrar un mensaje al usuario o realizar otras acciones necesarias
            });
    };















    [
    BioharvestApp: {
        Usuarios: {
            UID:{
                Nombre: "Nombre",
                Email: "Email",
                Fotobiorreactores: {
                    FID:{
                        Informacion:{
                            Nombre: "MiPriemrFotobiorreactor",
                            Especie: "Spirullina"
                        },
                        Control_IA: false,
                        Parameters:{
                            CicloDiaNoche: false,
                            LightIntensity: 0,
                            Ph: 0,
                            Temperature: 0,
                        },
                        Sensors:{
                            ldr: 0,
                            ph: 0,
                            temperature: 0
                        },
                        Switches:{
                            Bomba: false,
                            Luz: false,
                            Calentador: false
                        }
                    }
                }
            }
        }
    }
]
*/
