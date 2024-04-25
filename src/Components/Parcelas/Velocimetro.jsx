import React, { useState } from 'react';
import './Velocimetro.css'; // Archivo CSS para estilos personalizados

const Velocimetro = ({ valorHumedad }) => {
  const [angulo, setAngulo] = useState(0);

  // Calcula el ángulo de rotación del puntero del velocímetro
  const calcularAngulo = (valor) => {
    // Limita el valor entre 0 y 100 (rango del velocímetro)
    const valorLimitado = Math.min(Math.max(valor, 0), 100);
    // Convierte el valor limitado a un ángulo entre -135° y 135°
    const anguloCalculado = ((valorLimitado / 100) * 270) - 135;
    return anguloCalculado;
  };

  // Actualiza el ángulo de rotación del puntero según el valor de humedad
  const actualizarAngulo = () => {
    const nuevoAngulo = calcularAngulo(valorHumedad);
    setAngulo(nuevoAngulo);
  };

  // Llama a actualizar el ángulo cuando cambia el valor de humedad
  React.useEffect(() => {
    actualizarAngulo();
  }, [valorHumedad]);

  return (
    <div className="velocimetro-container">
      <div className="velocimetro">
        <div
          className="puntero"
          style={{ transform: `rotate(${angulo}deg)` }}
        ></div>
        <div className="etiqueta">Humedad: {valorHumedad}%</div>
      </div>
    </div>
  );
};

export default Velocimetro;
