import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import ErrorMessage from '../components/errorMessage';
import SucessMessage from '../components/sucessMessage';
import ValueMessage from '../components/valueMessage';
import CarsInside from '../components/carsInside';
import axios from 'axios';

const Saida = () => {
  window.onload = createElements();
  const [errorVisible, toggleVisibleError] = useState(false);
  const [sucessVisible, toggleVisibleSucess] = useState(false);
  const [value, setValue] = useState(0);

  function calcValue(h) {
    var time = Date.parse(h);
    var currentTime = new Date().getTime();
    var diff = currentTime - time;
    var hours = Math.ceil(diff / 1000 / 60 / 60);
    var valor = hours * 3;
    valor = parseFloat(valor);
    return valor;
  }

  async function setValorPago() {
    var placaBuscada = document.getElementById('placa').value.toUpperCase();

    toggleVisibleSucess(false);
    toggleVisibleError(false);
    setValue(0);

    const carro = await axios.get(
      `http://localhost:3001/api/saida/${placaBuscada}`
    );
    if (!carro.data) {
      toggleVisibleError(true);
      return false;
    } else {
      axios.put(
        'http://localhost:3001/api/saida/valorpago',
        {
          valor_pago: calcValue(carro.data.horario_entrada),
          id: carro.data.id,
        },
        toggleVisibleSucess(true)
      );
    }
  }

  async function createElements() {
    const cars = await axios.get('http://localhost:3001/api/saida');
    var elements = [];

    if (!cars) {
      return;
    } else {
      for (let i = 0; i < cars.data.length; i++) {
        const el = React.createElement(
          CarsInside,
          {
            key: i.toString(),
            placa: cars.data[i].placa,
            marca: cars.data[i].marca,
            modelo: cars.data[i].modelo,
            horarioEntrada: cars.data[i].horario_entrada,
          }
        );
        elements.push(el);
      }
      ReactDOM.render(elements, document.getElementById('cars'));
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 className="h1">Registro de Saida via Placa</h1>
      <div>
        {' '}
        {errorVisible ? (
          <ErrorMessage message="Placa não encontrada dentro do estacionamento." />
        ) : null}{' '}
      </div>
      <div>
        {' '}
        {sucessVisible ? (
          <SucessMessage message="Saida Registrada" />
        ) : null}{' '}
      </div>
      <div> {value !== 0 ? <ValueMessage message={value} /> : null} </div>
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
          />
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={() => {
          setValorPago();
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
