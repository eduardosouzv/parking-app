import React from 'react';

const LineRelatorio = (props) =>{
    return (
        <div className="">
            <li className="list-group-item row col-md-12">
                <h5>
                <span className="font-weight-bold">Placa</span> : <span className="font-weight-light">{props.placa} </span> | 
                <span className="font-weight-bold">Marca/Modelo</span> : <span className="font-weight-light">{props.marca}, {props.modelo}</span> |
                <span className="font-weight-bold">Valor Pago</span> : <span className="font-weight-light">R$ {props.valor},00</span>
                </h5>
            </li>
        </div>
    );
}

export default LineRelatorio;