import React, { useState } from 'react';
import './Tablecultivos.css';
import { useNavigate } from 'react-router-dom';

function TableCultivos({ data }) {
    const [searchTerm, setSearchTerm] = useState('');

    // Filtrar los datos por el nombre
    const filteredData = data.filter(item =>
        item.etiqueta.toLowerCase().includes(searchTerm.toLowerCase())
    );
    


    const navigate = useNavigate();
    
    const goToCultivos= () => {
        navigate('/MisCultivos', { state: { datos: data } });
    };
  

    return (
        <div className="containerCardTable">
            <div className="elementsTopContainer">
                <h1 className='TitleTable' onClick={goToCultivos}>Mis parcelas</h1>
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
                            <th className='thdT2'>Etiqueta de parcela</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item) => (
                            <tr className='trT2' key={item.pid}>
                                <td className='tdT2'>{item.pid}</td>
                                <td className='tdT2'>{item.etiqueta}</td>
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TableCultivos;
