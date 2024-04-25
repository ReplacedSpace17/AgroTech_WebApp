import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TableRutinas({ data }) {
    const [searchTerm, setSearchTerm] = useState('');

 


    const navigate = useNavigate();
    
    const goToCultivos= () => {
        navigate('/MisCultivos', { state: { datos: data } });
    };
  

    return (
        <div className="containerCardTable">
            <div className="elementsTopContainer">
                <h1 className='TitleTable' >Rutinas de riego generadas IA</h1>
               
            </div>
            <div className="containerTable">
                <table className='tableT2'>
                    <thead className='theadT2'>
                        <tr className='trT2'>
                            
                            <th className='thdT2'>Tiempo de actividad(ms)</th>
                            <th className='thdT2'>Tiempo de inactividad(ms)</th>
                            <th className='thdT2'>Ciclos de trabajo</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr className='trT2' key={item.rid}>
                                <td className='tdT2'>{item.activado} segundos</td>
                                <td className='tdT2'>{item.desactivado} segundos</td>
                                <td className='tdT2'>{item.ciclos} segundos</td>
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TableRutinas;
