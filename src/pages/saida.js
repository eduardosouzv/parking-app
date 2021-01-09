import React, { useState } from 'react';

import ErrorMessage from '../components/errorMessage';
import SucessMessage from '../components/sucessMessage';
import ValueMessage from '../components/valueMessage';
import CarsInside from '../components/carsInside';
import axios from 'axios';

const Saida = () => {
  const [errorVisible, toggleVisibleError] = useState(false);
  const [sucessVisible, toggleVisibleSucess] = useState(false);
  const [value, setValue] = useState(0);

  function calcValue(h) {
    var time = Date.parse(h);
    var currentTime = new Date().getTime();
    var diff = currentTime - time;
    var hours = Math.ceil(diff / 1000 / 60 / 60);
    var valor = hours * 3;
    valor = parseFloat(valor)
    return valor;
  }

  async function setValorPago(){
    var placaBuscada = document.getElementById('placa').value.toUpperCase();

    toggleVisibleSucess(false);
    toggleVisibleError(false);
    setValue(0);

    const carro = await axios.get(`http://localhost:3001/api/saida/${placaBuscada}`);
    if (!carro.data){
      toggleVisibleError(true);
      return false;
    } else {
      axios.put('http://localhost:3001/api/saida/valorpago', {
        valor_pago: calcValue(carro.data.horario_entrada),
        id: carro.data.id
      })
    }
    
  }

  // function buscaPlaca() {
  //   toggleVisibleSucess(false);
  //   toggleVisibleError(false);
  //   setValue(0);

  //   var placaBuscada = document.getElementById('placa').value.toUpperCase();

  //   var localStorageCars = localStorage.getItem('carros');
  //   var carros = JSON.parse(localStorageCars);
  //   var found = false;

  //   for (let i = 0; i < carros.length; i++) {
  //     if (carros[i].placa === placaBuscada && !carros[i].horario_saida) {
  //       var value = calcValue(carros[i].horario_entrada);

  //       setValue(value);
  //       carros[i].valor_pago = value;
  //       carros[i].horario_saida = new Date();

  //       localStorage.clear();
  //       var carHistoryNewUpdate = JSON.stringify(carros);
  //       localStorage.setItem('carros', carHistoryNewUpdate);

  //       found = true;
  //       toggleVisibleSucess(true);
  //       return true;
  //     }
  //   }

  //   if (!found) {
  //     toggleVisibleError(true);
  //     return false;
  //   }
  // }

  // async function cars() {
  //   const carros = await axios.get('http://localhost:3001/api/saida');
  //   return carros.data;
  // }

  // function carsInside() {
  //   const carros =  cars();
  //   var elements = [];

  //   if (!carros) {
  //     return;
  //   } else {
  //     for (let i = 0; i < carros.length; i++) {
  //       elements.push(<CarsInside key={i.toString()} placa={ carros[i].placa } marca={ carros[i].marca } modelo={ carros[i].modelo } horarioEntrada={ carros[i].horario_entrada } />)

  //       var dataJSON = {
  //         placa: carros[i].placa,
  //         marca: carros[i].marca,
  //         modelo: carros[i].modelo,
  //         horario_entrada: carros[i].horario_entrada,
  //       };

  //       elements.push(dataJSON);
  //     }
  //     console.log('elements: ', elements);
  //     return elements;
  //   }
  // }



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
          {/* {carsInside()} */}
        </ul>
      </div>
    </div>
  );
};

export default Saida;
