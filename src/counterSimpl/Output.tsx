import React from 'react';

type OutputPropsType = {
    value: number
    maxValue: number
}

export const Output:React.FC<OutputPropsType> = (props) => {

    const finalClass = `output ${props.value === props.maxValue ? 'max-value' : ''}`

    return (
        <div className={finalClass}>
            {props.value}
        </div>
    );
};

