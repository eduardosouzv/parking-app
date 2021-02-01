import React from 'react';

const errorMessage = (props) => {
    return (
        <div className="alert alert-danger col-md-6 mx-auto" role="alert">{ props.message }</div>
    );
}

export default errorMessage;