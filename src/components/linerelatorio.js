import React from 'react';

const LineRelatorio = (props) =>{
    return (
        <div className="">
            <li className="list-group-item row col-md-12"><h5>
                Placa : {props.placa} | 
                Marca/Modelo : {props.marca}, {props.modelo} |
                Valor Pago : R$ {props.valor}
                </h5></li>
        </div>
    );
}

export default LineRelatorio;