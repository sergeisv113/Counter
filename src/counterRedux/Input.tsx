import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react';

type DefaultInputType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type InputNumberType = DefaultInputType & {
    onChangeNumber?: (value: number) => void
}


export const Input: React.FC<InputNumberType> = (
    {
        onChange,
        onChangeNumber,
        ...restProps
    }
) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);
        onChangeNumber && onChangeNumber(+e.currentTarget.value)
    }

    return (
        <input
            onChange={handleChange}
            {...restProps}/>
    );
};