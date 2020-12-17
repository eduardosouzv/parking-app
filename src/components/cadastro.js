import React, { useState } from 'react';

const Cadastro = () => {

  const [errorVisible, toggleVisibleError] = useState(false);
  const [sucessVisible, toggleVisibleSucess] = useState(false);

  const msgElementError = (
    <div className="alert alert-danger col-md-6 mx-auto" role="alert">Erro no preenchimento de dados.</div>
  );

  const msgElementSucess = (
    <div className="alert alert-success col-md-6 mx-auto" role="alert">Registrado com sucesso !</div>
  );

  var arrayData = [];

  function registerData() {

    toggleVisibleError(false)
    toggleVisibleSucess(false)

    if (verificaPlaca() && verificaNome() && verificaModelo() && verificaMarca()){
      var carData = {
        placa: document.getElementById('placa').value,
        nome: document.getElementById('nome').value,
        marca: document.getElementById('marca').value,
        modelo: document.getElementById('modelo').value
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

    var placa = document.getElementById('placa').value

    console.log(placa)

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

    var letrasPlaca = placa.slice(0,3)
    var numerosPlaca = placa.slice(3,7)
    
    if( !isNaN(parseInt(letrasPlaca)) ){
      toggleVisibleError(true)
      return false
    } else if( isNaN(parseInt(numerosPlaca)) ){
      toggleVisibleError(true)
      return false
    } else if(placaExistente()){
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
    <div className="">
      <div id="alert"> { errorVisible ? msgElementError : null }</div>
      <div id="alert"> { sucessVisible ? msgElementSucess : null }</div>
        <div className="form-group row d-flex justify-content-center">
          <label htmlFor="placa" className="col-md-1 col-form-labe" >
            Placa
          </label>
          <div className="col-sm-2">
            <input type="text" className="form-control" id="placa" placeholder="AAA0000" />
          </div>
        </div>

        <div className="form-group row d-flex justify-content-center">
          <label htmlFor="nome" className="col-md-1 col-form-labe">
            Nome
          </label>
          <div className="col-sm-2">
            <input type="text" className="form-control" id="nome" />
          </div>
        </div>

        <div className="form-group row d-flex justify-content-center">
          <label htmlFor="marca" className="col-md-1 col-form-labe">
            Marca
          </label>
          <div className="col-sm-2">
            <input type="text" className="form-control" id="marca" />
          </div>
        </div>

        <div className="form-group row d-flex justify-content-center">
          <label htmlFor="modelo" className="col-md-1 col-form-labe">
            Modelo
          </label>
          <div className="col-sm-2">
            <input type="text" className="form-control" id="modelo" />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" onClick={ () => { registerData() } }  >
        Registrar
        </button>
    </div>
  );
};

export default Cadastro;
