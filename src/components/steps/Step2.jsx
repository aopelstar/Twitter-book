import React from 'react';
import { SwatchesPicker } from 'react-color';

export default function Step2(props) {
    return (
        <div>
            <SwatchesPicker onChange={(color,event) => props.handleChange(color, event)} />
        </div>
    )
}
