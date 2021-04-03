import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import LineRelatorio from '../components/linerelatorio';

const Relatorio = () => {
  useEffect(() => {
    loadCurrentReport();
  }, []);

  async function loadCurrentReport() {
    const cars = await axios.get('http://localhost:3001/api/relatorio');
    let elements = [];

    if (!cars) {
      return;
    } else {
      for (let i = 0; i < cars.data.length; i++) {
        const el = React.createElement(LineRelatorio, {
          key: i.toString(),
          placa: cars.data[i].placa,
          marca: cars.data[i].marca,
          modelo: cars.data[i].modelo,
          valor: cars.data[i].valor_pago,
        });
        elements.push(el);
      }
      ReactDOM.render(elements, document.getElementById('cars'));
    }
  }

  return (
    <div style={{ textAlign: 'center' }} className="container">
      <ul className="list-group-item">
        <h1 className="h1">Relatorio do Dia</h1>
        <div id="cars"></div>
      </ul>
    </div>
  );
};

export default Relatorio;
