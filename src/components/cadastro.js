import React from 'react';

const Cadastro = () => {

  return (
    <div className="">
      <form >
        <div className="form-group row d-flex justify-content-center">
          <label htmlFor="placa" className="col-md-1 col-form-labe">
            Placa
          </label>
          <div className="col-sm-2">
            <input type="text" className="form-control" id="placa" />
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

        <button type="submit" className="btn btn-primary">
        Registrar
        </button>
      </form>
    </div>
  );
};

export default Cadastro;
