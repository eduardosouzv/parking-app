import React from 'react'

import LineRelatorio from '../components/linerelatorio'

const Relatorio = () =>{

    
    function showData() {
        var carrosJSONstring = localStorage.getItem('carros')
        var carros = JSON.parse(carrosJSONstring);
        var elements = []

        for (let i = 0; i < carros.length; i++) {
            
            if(carros[i].valor_pago) {
                elements.push(<LineRelatorio key={i.toString()} placa={ carros[i].placa } marca={ carros[i].marca } modelo={ carros[i].modelo } valor={ carros[i].valor_pago } />)
            }

        }
        return elements;
    }

    return (
        <div style={{ textAlign: "center" }} className="container">

            <ul className="list-group-item">
            <h1 className="h1">Relatorio do Dia</h1>
            {showData()}

            </ul>

        </div>
    );
}

export default Relatorio;