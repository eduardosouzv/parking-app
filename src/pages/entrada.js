import React, { useState } from 'react';
import axios from 'axios';

import ErrorMessage from '../components/errorMessage';
import SucessMessage from '../components/sucessMessage';

const Home = () => {
  const [errorVisible, toggleVisibleError] = useState(false);
  const [sucessVisible, toggleVisibleSucess] = useState(false);

  async function registerData() {
    toggleVisibleError(false);
    toggleVisibleSucess(false);

    var placa = document.getElementById('placa').value.toUpperCase();
    var nome = document.getElementById('nome').value;
    var marca = document.getElementById('marca').value;
    var modelo = document.getElementById('modelo').value;

    if (
      await verificaPlaca(placa) &&
      verificaNome(nome) &&
      verificaModelo(modelo) &&
      verificaMarca(marca)
    ) {
      axios
        .post('http://localhost:3001/api/register', {
          placa: placa,
          nome: nome,
          marca: marca,
          modelo: modelo
        })
        .then((res) => {
          console.log(res);
        })
        .then((err) => {
          console.log('error:', err);
        });
        toggleVisibleSucess(true);
    }
  }

  async function buscarCarro(placa) {
    const carros = await axios.get(`http://localhost:3001/api/carros/${placa}`);
    return carros.data;
  }

  async function verificaPlaca(placa) {
    if (placa.length !== 7) {
      toggleVisibleError(true);
      return false;
    }

    var placaSplit = placa.split('');

    if (
      !isNaN(placaSplit[0]) ||
      !isNaN(placaSplit[1]) ||
      !isNaN(placaSplit[2])
    ) {
      toggleVisibleError(true);
      return false;
    } else if (
      isNaN(parseInt(placaSplit[3])) ||
      isNaN(parseInt(placaSplit[4])) ||
      isNaN(parseInt(placaSplit[5])) ||
      isNaN(parseInt(placaSplit[6]))
    ) {
      toggleVisibleError(true);
      return false;
    }
    var carro = await buscarCarro(placa)
    
    if (carro) {
      toggleVisibleError(true);
      return false;
    }
    
    return true;
  }

  function verificaNome(nome) {
    if (nome.length > 0) {
      return true;
    }
    toggleVisibleError(true);
    return false;
  }

  function verificaMarca(marca) {
    if (marca.length > 0) {
      return true;
    }
    toggleVisibleError(true);
    return false;
  }

  function verificaModelo(modelo) {
    if (modelo.length > 0) {
      return true;
    }
    toggleVisibleError(true);
    return false;
  }

  return (
    <div style={{ textAlign: 'center' }} className="">
      <h1 className="h1">Cadastro</h1>
      <div id="alert">
        {' '}
        {errorVisible ? (
          <ErrorMessage message="Erro no preenchimento de dados." />
        ) : null}
      </div>
      <div id="alert">
        {' '}
        {sucessVisible ? (
          <SucessMessage message="Registrado com sucesso !" />
        ) : null}
      </div>
      <div className="form-group row d-flex justify-content-center">
        <label htmlFor="placa" className="col-md-1 col-form-labe">
          Placa
        </label>
        <div className="col-sm-2">
          <input
            type="text"
            className="form-control"
            id="placa"
            placeholder="AAA0000"
            autoComplete="off"
          />
        </div>
      </div>

      <div className="form-group row d-flex justify-content-center">
        <label htmlFor="nome" className="col-md-1 col-form-labe">
          Nome
        </label>
        <div className="col-sm-2">
          <input
            type="text"
            className="form-control"
            id="nome"
            autoComplete="off"
          />
        </div>
      </div>

      <div className="form-group row d-flex justify-content-center">
        <label htmlFor="marca" className="col-md-1 col-form-labe">
          Marca
        </label>
        <div className="col-sm-2">
          <input
            type="text"
            className="form-control"
            id="marca"
            autoComplete="off"
          />
        </div>
      </div>

      <div className="form-group row d-flex justify-content-center">
        <label htmlFor="modelo" className="col-md-1 col-form-labe">
          Modelo
        </label>
        <div className="col-sm-2">
          <input
            type="text"
            className="form-control"
            id="modelo"
            autoComplete="off"
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        onClick={() => {
          registerData();
        }}
      >
        Registrar
      </button>
    </div>
  );
};

export default Home;
