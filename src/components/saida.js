import React, { useState } from 'react';

const Saida = () => {

  const [errorVisible, toggleVisibleError] = useState(false);
  const [sucessVisible, toggleVisibleSucess] = useState(false);

  const msgElementError = (
    <div className="alert alert-danger col-md-6 mx-auto" role="alert">Placa não encontrada.</div>
  );

  const msgElementSucess = (
    <div className="alert alert-success col-md-6 mx-auto" role="alert">Saida Registrada</div>
  );

  function buscaPlaca() {
    toggleVisibleSucess(false);
    toggleVisibleError(false)

    var placaBuscada = document.getElementById('placa').value.toUpperCase();
    
    var localStorageCars = localStorage.getItem('carros');
    var carros = JSON.parse(localStorageCars);
    var found = false;

    for (let i = 0; i < carros.length; i++) {
      if (carros[i].placa === placaBuscada) {
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
    <div>
      <div> { errorVisible ? msgElementError : null } </div>
      <div> { sucessVisible ? msgElementSucess : null } </div>
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
