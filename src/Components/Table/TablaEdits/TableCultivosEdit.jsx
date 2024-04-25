import React, { useState } from 'react';
import '../table.css';
import { useNavigate } from 'react-router-dom';
import data from '../../../Views/Home/tablaCultivos.json';
import editIcon from '../../../assets/Components/Icons/edit.svg';
import deleteIcon from '../../../assets/Components/Icons/delete.svg';
import settingsIcon from '../../../assets/Components/Icons/ajustes.svg';

import Swal from 'sweetalert2';
import backenURL from '../../../backend';
import axios from 'axios';
import { getDatabase, ref, remove } from 'firebase/database';

function TableCultivosEdit( {data}) {

    const uid = localStorage.getItem('uid');
const cultivo_id = localStorage.getItem('newCultivoId');


    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Filtrar los datos por el nombre
    const filteredData = data.filter(item =>
        item.etiqueta.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const regresar = () => {
        navigate('/Home');
    };
    const agregarCultivo = () => {
        navigate('/AgregarCultivo');
    };

    const deleteFirebaseCultivo = (UID, CID) => {
        // Obtener una referencia a la base de datos de Firebase
        const db = getDatabase();
        // Referencia al nodo específico en la base de datos que deseas eliminar
        const CultivoId = ref(db, `BioharvestApp/Usuarios/${UID}/Fotobiorreactores/${CID}`);
    
        // Intentar eliminar el dato de la base de datos
        remove(CultivoId)
            .then(() => {
                console.log('Dato eliminado correctamente.');
            })
            .catch((error) => {
                console.error('Error al eliminar el dato:', error);
                // Manejar el error, puedes mostrar un mensaje al usuario o realizar otras acciones necesarias
            });
    };

    const solicitudDeleteBackend = async (id_cultivo) => {
        try {
            const response = await axios.delete(backenURL + '/agrotech/app/parcela/'+id_cultivo );
            // Verificar el código de estado de la respuesta
            if (response.status === 200) {
                //Mostrar un swal para indicar que la cepa ha sido agregada exitosamente y despues redirigir al usuario a la vista de MisCepas
                Swal.fire(
                    'Eliminada!',
                    'El cultivo ha sido eliminado.',
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
    
    const deleteCultivo = (id) => {
        //alerta de confirmacion
        Swal.fire({
            title: '¿Estás seguro de eliminar el cultivo?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarla!'
        }).then((result) => {
            if (result.isConfirmed) {
                solicitudDeleteBackend(id);
                //deleteFirebaseCultivo(uid, id);


            }
        })
    };

    //item.id, item.nombre, item.nombre_cepa, item.motivo, item.cepa_id
    const editCultivo = (ID, Nombre, Especie, Motivo, CepaID) => {
        navigate('/EditarCultivo', { state: { ID, Nombre, Especie, Motivo, CepaID } });

    };

    const goToViewCultivos = (etiqueta, instruccions, id) => {
        localStorage.setItem('NameParcela', etiqueta);
        localStorage.setItem('Poligon', instruccions);
        localStorage.setItem('ParcelaActiva', id);
        navigate('/View/Parcelas');
    }

    return (
        <div className="containerCardTable">
            <div className="elementsTopContainer">
                <h1 className='TitleTable' onClick={regresar}>Mis parcelas</h1>
                <input
                    type="text"
                    placeholder="Buscar por nombre"
                    className="inputSearch"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="containerTable">
                <table className='tableT2'>
                    <thead className='theadT2'>
                        <tr className='trT2'>
                            <th className='thdT2'>ID</th>
                            <th className='thdT2'>Nombre de parcela</th>
                            <th className='thdT2'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr className='trT2' key={item.pid}>
                                <td className='tdT2'>{index + 1 }</td>
                                <td className='tdT2'>{item.etiqueta}</td>
                           
                                <td className='tdT1'>
                                    <div className="iconContainer">
                                        <img src={settingsIcon} onClick={() => goToViewCultivos(item.etiqueta, item.instrucciones, item.pid)} className='iconTable' />
                        
                                        <img src={deleteIcon} onClick={() => deleteCultivo(item.pid)} className='iconTable' />

                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="buttonsBottom">
                <button className="buttonTable" onClick={regresar}>Regresar</button>
                <button className="buttonTable" onClick={agregarCultivo}>Crear nueva</button>
            </div>
        </div>
    );
}

export default TableCultivosEdit;
