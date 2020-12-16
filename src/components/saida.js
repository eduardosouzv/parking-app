import React from 'react';

const Saida = () => {
  return (
    <div>
      <form>
        <div className="form-group row d-flex justify-content-center">
          <label htmlFor="placa" className="col-md-1 col-form-labe">
            Placa
          </label>
          <div className="col-sm-2">
            <input type="text" className="form-control" id="placa" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Registrar</button>
      </form>
    </div>
  );
};

export default Saida;
