import React from 'react';

const sucessMessage = (props) => {
    return(
        <div className="alert alert-success col-md-6 mx-auto" role="alert">{ props.message }</div>
    );
}

export default sucessMessage;