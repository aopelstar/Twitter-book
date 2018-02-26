import React from 'react';
import { SwatchesPicker } from 'react-color';

class ColorPicker extends React.Component {
    constructor() {
        super();
        this.state = {
            color: null
        }
    }
    render() {
        return (
            <SwatchesPicker />
        )
    }
}
export default ColorPicker