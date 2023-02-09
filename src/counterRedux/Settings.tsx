import React from 'react';
import {Input} from "./Input";


type SettingsPropsType = {
    minValue: number
    maxValue: number
    minChange: (value: number) => void
    maxChange: (value: number) => void
}

export const Settings = (props: SettingsPropsType) => {
    return (
        <div className='settings'>
            <div className='settingsInputWrap'>
                <span className='settingsInputLabel'>Max value:</span>
                <Input
                    type={"number"}
                    value={props.maxValue.toString()}
                    onChangeNumber={props.maxChange}
                    className='settingsInput'/>
            </div>
            <div className='settingsInputWrap'>
                <span className='settingsInputLabel'>Min  value:</span>
                <Input
                    type={'number'}
                    value={props.minValue.toString()}
                    onChangeNumber={props.minChange}
                    className='settingsInput'/>
            </div>

        </div>
    );
};
