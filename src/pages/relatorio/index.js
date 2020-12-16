import React from 'react'

import LineRelatorio from '../../components/linerelatorio'

const Relatorio = () =>{
    return (
        <div style={{ textAlign: "center" }} className="container">

            <ul className="list-group-item">
            <h1 className="h1">Relatorio do Dia</h1>
                <LineRelatorio placa="AAA7777" marca="HONDA" modelo="CIVIC" valor="10.00" />
                <LineRelatorio placa="AAA7777" marca="HONDA" modelo="CIVIC" valor="10.00" />
                <LineRelatorio placa="AAA7777" marca="HONDA" modelo="CIVIC" valor="10.00" />
                <LineRelatorio placa="AAA7777" marca="HONDA" modelo="CIVIC" valor="10.00" />
                <LineRelatorio placa="AAA7777" marca="HONDA" modelo="CIVIC" valor="10.00" />
            </ul>

        </div>
    );
}

export default Relatorio;