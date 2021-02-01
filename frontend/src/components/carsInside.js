import React from 'react';

const carsInsideLine = (props) => {

    var dataProps = new Date(props.horarioEntrada)
    var data = dataProps.toLocaleTimeString();


    return (
        <div>
            <li className="list-group-item row col-md-12">
                <h5>
                <span className="font-weight-bold">Placa</span> : <span className="font-weight-light">{props.placa} </span> | 
                <span className="font-weight-bold">Marca/Modelo</span> : <span className="font-weight-light">{props.marca}, {props.modelo}</span> |
                <span className="font-weight-bold">Horario de Entrada</span> : <span className="font-weight-light">{ data }</span>
                </h5>
            </li>
        </div>
    );
}

export default carsInsideLine;