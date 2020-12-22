import React, { useState } from 'react';

import ErrorMessage from '../components/errorMessage';
import SucessMessage from '../components/sucessMessage';

const Home = () => {

  const [errorVisible, toggleVisibleError] = useState(false);
  const [sucessVisible, toggleVisibleSucess] = useState(false);

  var arrayData = [];

  function registerData() {

    toggleVisibleError(false)
    toggleVisibleSucess(false)

    if (verificaPlaca() && verificaNome() && verificaModelo() && verificaMarca()){
      var objItemPlaca = document.getElementById('placa').value.toUpperCase();
      var objItemNome = document.getElementById('nome').value;
      var objItemMarca = document.getElementById('marca').value;
      var objItemModelo = document.getElementById('modelo').value;
      var horarioEntrada = new Date();

      var carData = {
        placa: objItemPlaca,
        nome: objItemNome,
        marca: objItemMarca,
        modelo: objItemModelo,
        horario_entrada: horarioEntrada,
        horario_saida: '',
        valor_pago: ''
      }

      arrayData.push(carData)

      if (localStorage.getItem('carros') === null){

        var carDataJSON = JSON.stringify(arrayData)
        localStorage.setItem('carros', carDataJSON)

      } else {
        var carHistoryString = localStorage.getItem('carros')
        var carHistory = JSON.parse(carHistoryString)
        localStorage.clear()

        carHistory.push(carData)

        var carHistoryNewUpdate = JSON.stringify(carHistory)        
        localStorage.setItem('carros', carHistoryNewUpdate)
        
      }

      return toggleVisibleSucess(true)

    }
  }

  function verificaPlaca() {

    var placa = document.getElementById('placa').value.toUpperCase();

    function placaExistente() {

      if( localStorage.getItem('carros') !== null ){
        var carHistoryString = localStorage.getItem('carros')
        var carHistory = JSON.parse(carHistoryString)

        for (let i = 0; i < carHistory.length; i++) {
          if( carHistory[i].placa === placa ){
            return true
          }
        }
        return false
      }
    }

    if (placa.length !== 7 ) {
      toggleVisibleError(true)
      return false
    }

    var placaSplit = placa.split('')

    if (!isNaN(parseInt(placaSplit[0])) || !isNaN(placaSplit[1]) || !isNaN(placaSplit[2])) {
      toggleVisibleError(true)
      return false
    } else if (isNaN( parseInt(placaSplit[3]) ) || isNaN( parseInt(placaSplit[4] )) 
    || isNaN( parseInt(placaSplit[5]) ) || isNaN( parseInt(placaSplit[6]) ) ) 
    {
      toggleVisibleError(true)
      return false
    } else if (placaExistente()) {
      toggleVisibleError(true)
      return false
    } else {
      return true
    }

  }
  
  function verificaNome() {
    var nome = document.getElementById('nome').value
    if(nome.length > 0) {
      return true
    } else {
      toggleVisibleError(true)
      return false
    }
  }
  
  function verificaMarca() {
    var marca =  document.getElementById('marca').value
    if(marca.length > 0) {
      return true
    } else {
      toggleVisibleError(true)
      return false
    }
  }
  
  function verificaModelo() {
    var modelo = document.getElementById('modelo').value
    if(modelo.length > 0) {
      return true
    } else {
      toggleVisibleError(true)
      return false
    }
  }


  return (
    <div style={{ textAlign: "center" }} className="">
      <h1 className="h1">Cadastro</h1>
      <div id="alert"> { errorVisible ? <ErrorMessage message="Erro no preenchimento de dados." /> : null }</div>
      <div id="alert"> { sucessVisible ? <SucessMessage message="Registrado com sucesso !" /> : null }</div>
        <div className="form-group row d-flex justify-content-center">
          <label htmlFor="placa" className="col-md-1 col-form-labe" >
            Placa
          </label>
          <div className="col-sm-2">
            <input type="text" className="form-control" id="placa" placeholder="AAA0000" autoComplete="off" />
          </div>
        </div>

        <div className="form-group row d-flex justify-content-center">
          <label htmlFor="nome" className="col-md-1 col-form-labe">
            Nome
          </label>
          <div className="col-sm-2">
            <input type="text" className="form-control" id="nome" autoComplete="off" />
          </div>
        </div>

        <div className="form-group row d-flex justify-content-center">
          <label htmlFor="marca" className="col-md-1 col-form-labe">
            Marca
          </label>
          <div className="col-sm-2">
            <input type="text" className="form-control" id="marca" autoComplete="off" />
          </div>
        </div>

        <div className="form-group row d-flex justify-content-center">
          <label htmlFor="modelo" className="col-md-1 col-form-labe">
            Modelo
          </label>
          <div className="col-sm-2">
            <input type="text" className="form-control" id="modelo" autoComplete="off" />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" onClick={ () => { registerData() } }  >
        Registrar
        </button>
    </div>
  );
};

export default Home;
