import React from 'react';
import './Button.css';

const Button: React.FunctionComponent <any> = (props) => {

    const { handle, int, complite } = props;

    return (
        <button className={`button ${props.buttonClass}`} type="button" data-int={int} data-complite={complite} onClick={handle}>
           {props.children}
        </button>
    )
}

export default Button;