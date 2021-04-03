import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import ErrorMessage from '../components/errorMessage';
import SucessMessage from '../components/sucessMessage';
import ValueMessage from '../components/valueMessage';
import CarsInside from '../components/carsInside';
import axios from 'axios';

const Saida = () => {
  useEffect(() => {
    loadCarsInside();
  }, []);

  const [errorAlert, handleErrorAlert] = useState(false);
  const [sucessAlert, handleSucessAlert] = useState(false);

  const [price, setPrice] = useState(0);
  const [plaque, setPlaque] = useState();

  function calculatePrice(h) {
    let time = Date.parse(h);
    let currentTime = new Date().getTime();

    let diff = currentTime - time;
    let hours = Math.ceil(diff / 1000 / 60 / 60);
    let price = hours * 3;
    return parseFloat(price);
  }

  async function handlePrice() {
    handleSucessAlert(false);
    handleErrorAlert(false);
    setPrice(0);

    const car = await axios.get(`http://localhost:3001/api/saida/${plaque}`);
    if (!car.data) {
      handleErrorAlert(true);
      return false;
    } else {
      setPrice(calculatePrice(car.data.horario_entrada));
      axios.put(
        'http://localhost:3001/api/saida/valorpago',
        {
          valor_pago: calculatePrice(car.data.horario_entrada),
          id: car.data.id,
        },
        handleSucessAlert(true)
      );
    }
  }

  async function loadCarsInside() {
    const cars = await axios.get('http://localhost:3001/api/saida');
    var elements = [];

    if (!cars) {
      return;
    } else {
      for (let i = 0; i < cars.data.length; i++) {
        const el = React.createElement(CarsInside, {
          key: i.toString(),
          placa: cars.data[i].placa,
          marca: cars.data[i].marca,
          modelo: cars.data[i].modelo,
          horarioEntrada: cars.data[i].horario_entrada,
        });
        elements.push(el);
      }
      ReactDOM.render(elements, document.getElementById('cars'));
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 className="h1">Registro de Saida via Placa</h1>
      <div>
        {errorAlert ? (
          <ErrorMessage message="Placa não encontrada dentro do estacionamento." />
        ) : null}
      </div>
      <div> {sucessAlert ? <SucessMessage message="Saida Registrada" /> : null} </div>
      <div> {price !== 0 ? <ValueMessage message={price} /> : null} </div>
      <div className="form-group row d-flex justify-content-center">
        <label htmlFor="placa" className="col-md-1 col-form-labe">
          Placa
        </label>
        <div className="col-sm-2">
          <input
            type="text"
            className="form-control"
            id="placa"
            autoComplete="off"
            onChange={(e) => {
              setPlaque(e.target.value);
            }}
          />
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={() => {
          handlePrice();
        }}
      >
        Registrar
      </button>
      <div style={{ paddingTop: '40px' }} className="container">
        <ul className="list-group-item">
          <h1 className="h1">Carros Estacionados Atualmente</h1>
        </ul>
        <div id="cars"></div>
      </div>
    </div>
  );
};

export default Saida;
