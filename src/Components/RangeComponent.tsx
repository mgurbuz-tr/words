import { Button, TextField } from '@mui/material';
import React, { MouseEventHandler } from 'react';

interface RangeComponentProps {
    onClick: (startVal: number, endVal: number) => void;
}


function RangeComponent(props: RangeComponentProps): JSX.Element {
    const { onClick } = props;
    const [startVal, setStartVal] = React.useState('1');
    const handleChangeStartVal = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStartVal(event.target.value);
    };

    const [endVal, setEndVal] = React.useState('550');
    const handleChangeEndVal = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEndVal(event.target.value);
    };

    const btn_OnClick = () => {
        onClick(parseInt(startVal), parseInt(endVal));
    }
    return (
        <div id='parent'>
            <TextField id="outlined-name" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} label="Start" value={startVal} onChange={handleChangeStartVal} />
            <TextField id="outlined-name" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} label="End" value={endVal} onChange={handleChangeEndVal} />
            <Button variant="contained" onClick={(e) => { btn_OnClick() }}>Start</Button>
        </div>
    );
}

export default RangeComponent;
