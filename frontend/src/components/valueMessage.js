import React from 'react';

const genericMessage = (props) => {
    return(
        <div className="alert alert-secondary col-md-6 mx-auto" role="alert">Valor a ser pago : R$ { props.message },00</div>
    );
}

export default genericMessage;