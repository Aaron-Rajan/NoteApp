import {Component} from 'react';
import {Link} from 'react-router-dom';

const Button = (props) => {

    return (
        <div>
            <Link to={props.link}>
                <button type='button'>{props.someText}</button>
            </Link>
        </div>
    );
}

export default Button;