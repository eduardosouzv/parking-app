import React, { useState } from 'react';

const Saida = () => {

  const [errorVisible, toggleVisibleError] = useState(false);
  const [sucessVisible, toggleVisibleSucess] = useState(false);
  const [value, setValue] = useState(0);

  const msgElementError = (
    <div className="alert alert-danger col-md-6 mx-auto" role="alert">Placa não encontrada dentro do estacionamento.</div>
  );

  const msgElementSucess = (
    <div className="alert alert-success col-md-6 mx-auto" role="alert">Saida Registrada</div>
  );

  const msgElementValue = (
    <div className="alert alert-secondary col-md-6 mx-auto" role="alert">Valor a ser pago : R$ {value},00</div>
  );

  function calcValue(h) {
    var time = Date.parse(h);
    var currentTime = new Date().getTime();
    var diff = currentTime - time;
    var hours = Math.ceil(diff / 1000 / 60 / 60);
    var valor = hours * 3
    return valor
  }
  
  function buscaPlaca() {
    toggleVisibleSucess(false);
    toggleVisibleError(false);
    setValue(0);

    var placaBuscada = document.getElementById('placa').value.toUpperCase();
    
    var localStorageCars = localStorage.getItem('carros');
    var carros = JSON.parse(localStorageCars);
    var found = false;

    for (let i = 0; i < carros.length; i++) {
      if (carros[i].placa === placaBuscada && !carros[i].horario_saida) {
        var value = calcValue(carros[i].horario_entrada)
        
        setValue(value)
        carros[i].valor_pago = value
        carros[i].horario_saida = new Date()

        localStorage.clear()
        var carHistoryNewUpdate = JSON.stringify(carros)        
        localStorage.setItem('carros', carHistoryNewUpdate)

        found = true;
        toggleVisibleSucess(true);
        return true;
      }
    }

    if (!found){
      toggleVisibleError(true);
      return false;
    }

  }


  return (
    <div style={{ textAlign: "center" }}>
      <div> { errorVisible ? msgElementError : null } </div>
      <div> { sucessVisible ? msgElementSucess : null } </div>
      <div> { value !== 0 ? msgElementValue : null } </div>
      <h1 className="h1">Registro de Saida via Placa</h1>
        <div className="form-group row d-flex justify-content-center">
          <label htmlFor="placa" className="col-md-1 col-form-labe">
            Placa
          </label>
          <div className="col-sm-2">
            <input type="text" className="form-control" id="placa" autoComplete="off" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary" onClick={ () => { buscaPlaca() } } >Registrar</button>
    </div>
  );
};

export default Saida;
