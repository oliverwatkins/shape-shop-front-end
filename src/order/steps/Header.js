import * as React from 'react';

import "./addressStep.scss"

export default function Header(props) {
    return (
        <div className="wizardHeader wiz-item">
            <h3>
                {props.text}
            </h3>
        </div>
    );
}

