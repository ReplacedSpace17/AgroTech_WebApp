import React, { useState, useEffect } from 'react';
import '../table.css';
import { useNavigate } from 'react-router-dom';

import editIcon from '../../../assets/Components/Icons/edit.svg';
import deleteIcon from '../../../assets/Components/Icons/delete.svg';

import Swal from 'sweetalert2';
import backenURL from '../../../backend';
import axios from 'axios';

//recibir como parametro el json de las cepas
function TableCepasEdit({ data }) {

    // consloe log con data para verificar que se recibe
    console.log(data);
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    // Filtrar los datos por el nombre y ponner un autoincremental llamado NumCepa

    const filteredData = data.filter(item =>
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase())


    );

    const solicitudDeleteBackend = async (id_cepa) => {
        try {
            const response = await axios.delete(backenURL + '/api/cepas/' + id_cepa);
            // Verificar el código de estado de la respuesta
            if (response.status === 200) {
                //Mostrar un swal para indicar que la cepa ha sido agregada exitosamente y despues redirigir al usuario a la vista de MisCepas
                Swal.fire(
                    'Eliminada!',
                    'La cepa ha sido eliminada.',
                    'success'
                ).then(() => {
                    //recargar la pagina
                    window.location.reload();
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





    const regresar = () => {
        navigate('/Home');
    };
    const agregarCepa = () => {
        navigate('/AgregarCepa');
    };
  

    const deleteCepa = async (id, nombre) => {
        //alerta de confirmacion
        Swal.fire({
            title: '¿Estás seguro de eliminar ' + nombre + '?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarla!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Llamar a la función para eliminar la cepa
                solicitudDeleteBackend(id);
            }
        })
    };

    const editCepa = (ID, Nombre, Origen, Medio) => {
        navigate('/EditarCepa', { state: { ID, Nombre, Origen, Medio } });;

    };


    return (
        <div className="containerCardTable">
            <div className="elementsTopContainer">
                <h1 className='TitleTable' onClick={regresar}>Mis cepas</h1>
                <input
                    type="text"
                    placeholder="Buscar por nombre"
                    className="inputSearch"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="containerTable">
                <table className='tableT1'>
                    <thead className='theadT1'>
                        <tr className='trT1'>
                            <th className='thdT1'>ID</th>
                            <th className='thdT1'>Nombre</th>
                            <th className='thdT1'>Origen</th>
                            <th className='thdT1'>Medio</th>
                            <th className='thdT1'>Actions</th> {/* Nueva columna para acciones */}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr className='trT1' key={item.id}>
                                <td className='tdT1'>{index + 1}</td>
                                <td className='tdT1'>{item.nombre}</td>
                                <td className='tdT1'>{item.origen}</td>
                                <td className='tdT1'>{item.medio}</td>
                                <td className='tdT1'> {/* Columna para acciones */}
                                    <img src={editIcon} onClick={() => editCepa(item.id, item.nombre, item.origen, item.medio)} className='iconTable' />
                                    <img src={deleteIcon} onClick={() => deleteCepa(item.id, item.nombre)} className='iconTable' />

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="buttonsBottom">
                <button className="buttonTable" onClick={regresar}>Regresar</button>
                <button className="buttonTable" onClick={agregarCepa}>Agregar nueva</button>
            </div>
        </div>
    );
}

export default TableCepasEdit;
