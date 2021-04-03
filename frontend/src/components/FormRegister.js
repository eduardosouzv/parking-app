import React, { useState } from 'react';
import axios from 'axios';

import ErrorMessage from '../components/errorMessage';
import SucessMessage from '../components/sucessMessage';

const Home = () => {
  const [errorAlert, handleErrorAlert] = useState(false);
  const [sucessAlert, handleSucessAlert] = useState(false);

  const [plaque, setPlaque] = useState();
  const [name, setName] = useState();
  const [mark, setMark] = useState();
  const [model, setModel] = useState();

  async function registerData() {
    handleErrorAlert(false);
    handleSucessAlert(false);

    if (await validateFields(plaque, name, mark, model)) {
      axios
        .post('http://localhost:3001/api/register', {
          placa: plaque,
          nome: name,
          marca: mark,
          modelo: model,
        })
        .then((res) => {
          console.log(res);
        });
      handleSucessAlert(true);
    }
  }

  async function validateFields(plaque, name, mark, model) {
    if (plaque.length !== 7) {
      handleErrorAlert(true);
      return false;
    }

    let plaqueUnstructured = plaque.split('');

    if (
      !isNaN(plaqueUnstructured[0]) ||
      !isNaN(plaqueUnstructured[1]) ||
      !isNaN(plaqueUnstructured[2])
    ) {
      handleErrorAlert(true);
      return false;
    } else if (
      isNaN(parseInt(plaqueUnstructured[3])) ||
      isNaN(parseInt(plaqueUnstructured[4])) ||
      isNaN(parseInt(plaqueUnstructured[5])) ||
      isNaN(parseInt(plaqueUnstructured[6]))
    ) {
      handleErrorAlert(true);
      return false;
    }

    const carFound = await axios.get(`http://localhost:3001/api/carros/${plaque}`);

    if (carFound.data) {
      handleErrorAlert(true);
      return false;
    }

    if (name.length <= 0) {
      handleErrorAlert(true);
      return false;
    }

    if (mark.length <= 0) {
      handleErrorAlert(true);
      return false;
    }

    if (model.length <= 0) {
      handleErrorAlert(true);
      return false;
    }

    return true;
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 className="h1">Cadastro</h1>
      <div id="alert">
        {errorAlert ? <ErrorMessage message="Erro no preenchimento de dados." /> : null}
      </div>
      <div id="alert">
        {sucessAlert ? <SucessMessage message="Registrado com sucesso !" /> : null}
      </div>
      <div className="form-group row d-flex justify-content-center">
        <label htmlFor="placa" className="col-md-1 col-form-labe">
          Placa
        </label>
        <div className="col-sm-2">
          <input
            type="text"
            className="form-control"
            onChange={(e) => {
              setPlaque(e.target.value);
            }}
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
            onChange={(e) => {
              setName(e.target.value);
            }}
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
            onChange={(e) => {
              setMark(e.target.value);
            }}
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
            onChange={(e) => {
              setModel(e.target.value);
            }}
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
