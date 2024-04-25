import React, { useEffect, useRef } from 'react';

const PoligonBuild = ({ Title, Instrucciones }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Parsear las coordenadas de la cadena
    const vertices = parseCoordinates(Instrucciones);

    // Dibujar el polígono
    drawPolygon(ctx, vertices);
  }, [Instrucciones]);

  // Función para parsear las coordenadas de la cadena
  const parseCoordinates = (coordinatesString) => {
    const coordinates = coordinatesString.match(/\(([^)]+)\)/g); // Obtener todas las partes entre paréntesis
    if (!coordinates) return [];

    // Convertir las partes en objetos de coordenadas
    const vertices = coordinates.map((coord) => {
      const [x, y] = coord
        .replace(/[()]/g, '') // Eliminar paréntesis
        .split(',')
        .map((val) => parseFloat(val.trim())); // Convertir a números

      return { x, y };
    });

    return vertices;
  };

  // Función para dibujar un polígono
  const drawPolygon = (ctx, vertices) => {
    if (vertices.length < 2) return;

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

  return (
    <div className="container">
      <div className="containerTopGraphic">
        <p className='titleGraphic'>{Title}</p>
      </div>
      <div className="containerGraphicDonut">
        <canvas ref={canvasRef} width={500} height={200} />
      </div>
    </div>
  );
};

export default PoligonBuild;
