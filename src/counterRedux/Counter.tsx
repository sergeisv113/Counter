import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button} from "./Button";
import {Settings} from "./Settings";
import {Output} from "./Output";
import {AppRootStateType} from "./store/store";
import {changeSettingsAC, incrOutputAC, resetOutputAC, setSettingsAC} from "./store/countReducer";
import {SettingsSvg} from "./SettingsSvg";

export const Counter = () => {
    /////// redux
    const {minValue, maxValue, outputValue, settings} = useSelector((state: AppRootStateType) => state.count)
    const dispatch = useDispatch()

    /////// useStates
    const [minInput, setMinInput] = useState(minValue);
    const [maxInput, setMaxInput] = useState(maxValue);
    const [error, setError] = useState('')

    /////// useEffects
    // Устанавливает ошибку при недопустимых значениях инпутов
    useEffect(() => {
        checkIsSettingsCorrect() ? setError('') : setError('Incorrect settings')
    }, [maxInput, minInput])
    // Сбрасывает незасетанные значения инпутов в настройках при отключении settings
    useEffect(() => {
        if (!settings) {
            setMinInput(minValue)
            setMaxInput(maxValue)
        }
    }, [settings])

    /////// functions
    // Изменение инпутов
    const changeMinInput = (value: number) => setMinInput(parseInt(value.toString()))
    const changeMaxInput = (value: number) => setMaxInput(parseInt(value.toString()))
    // parseInt(value.toString()) не позволяет вводить дробные значения

    /////// Изменение значения счетчика
    const incrOutput = () => {
        if (outputValue >= maxValue) return
        dispatch(incrOutputAC())
    }
    const resetOutput = () => {
        if (outputValue <= minValue) return
        dispatch(resetOutputAC())
    }

    /////// Работа с настройками
    const changeSettings = () => dispatch(changeSettingsAC())
    const checkIsSettingsCorrect = () => {
        const minMax = minInput < maxInput
        const valuesNotNegative = minInput >= 0 && maxInput >= 0
        return minMax && valuesNotNegative
    }
    const setSettings = () => dispatch(setSettingsAC(minInput, maxInput))

    return (
        <div className={!error ? 'count' : 'count error'}>
            {settings && <div className='title'>
                {!error
                    ? <span>Enter values, press set and press 🛠</span>
                    : <span className='error-value'>{error}</span>}
            </div>}

            <div className='display'>
                {
                    !settings
                        ? <Output value={outputValue} maxValue={maxValue}/>
                        : <Settings
                            minValue={minInput}
                            maxValue={maxInput}
                            maxChange={changeMaxInput}
                            minChange={changeMinInput}/>
                }
            </div>
            <div className='buttons'>
                {
                    !settings
                        ? <>
                            <Button
                                className='count-btn'
                                disabled={outputValue === maxValue}
                                onClick={incrOutput}>inc</Button>
                            <Button
                                className='count-btn'
                                disabled={outputValue === minValue}
                                onClick={resetOutput}>reset</Button>
                        </>
                        : <Button className='count-btn'
                                  onClick={setSettings}
                                  disabled={!!error}>set</Button>
                }
                <SettingsSvg callback={changeSettings}/>
            </div>
        </div>
    );
};


