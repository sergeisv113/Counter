import React, {useEffect, useState} from 'react';
import {Button} from "./Button";
import {Settings} from "./Settings";
import {Output} from "./Output";
import {SettingsSvg} from "./SettingsSvg";


export const Counter = () => {

    ////// useStates
    const [count, setCount] = useState({
        minValue: 0,
        maxValue: 5
    });

    const [minInput, setMinInput] = useState(count.minValue);
    const [maxInput, setMaxInput] = useState(count.maxValue);
    const [outputValue, setOutputValue] = useState(count.minValue);
    const [settings, setSettings] = useState(false);
    const [isSetChanged, setIsSetChanged] = useState(false);
    const [error, setError] = useState('')

    /////// useEffects
    // Проверяет изменение настроек, устанавливает ошибку если инпуты не корректны
    useEffect(() => {
        setIsSetChanged(checkSetChanging())
        checkIsSetCorrect() ? setError('') : setError('Incorrect settings')
    }, [maxInput, minInput])

    // Устанавливает текущее значение счетчика при изменении count
    useEffect(() => {
        setOutputValue(count.minValue)
    }, [count])

    // Сбрасывает незасетанные изменения в настройках
    useEffect(() => {
        setMaxInput(count.maxValue)
        setMinInput(count.minValue)
    }, [settings])

    // Устанавливает настройки из localStorage при первом рендере
    useEffect(() => {
        setCount(getConfigFromLocalStorage())
    }, [])

    /////// functions
    // Работа с localStorage
    const setConfigToLocalStorage = () => {
        const newConfig = {
            maxValue: maxInput,
            minValue: minInput
        }
        const newConfigAsString = JSON.stringify(newConfig);
        localStorage.setItem('counterConfig', newConfigAsString)
    }
    const getConfigFromLocalStorage = () => {
        const newConfig = localStorage.getItem('counterConfig')
        return newConfig ? JSON.parse(newConfig) : count;
    }

    // Хэндлеры  изменение инпутов
    const changeMinInput = (value: number) => {
        setMinInput(parseInt(value.toString()))
    }
    const changeMaxInput = (value: number) => {
        setMaxInput(parseInt(value.toString()))

    }

    // Хэндлеры  изменение значения счетчика
    const incrOutputValue = () => {
        if (outputValue >= count.maxValue) return;
        setOutputValue(outputValue + 1);
    }
    const resetOutputValue = () => {
        if (outputValue <= count.minValue) return;
        setOutputValue(count.minValue);
    }

    // Работа с настройками
    const changeSettings = () => {
        setSettings(!settings)
    }

    const checkSetChanging = () => {
        const configValueSameAsInputValue = (count.maxValue === maxInput) && (count.minValue === minInput);
        return configValueSameAsInputValue;
    }
    //провезка что минимальное значение не больше мексимального
    const checkIsSetCorrect = () => {
        return minInput < maxInput;
    }
    const updateConfig = () => {
        setCount({
            minValue: minInput,
            maxValue: maxInput
        })
        setConfigToLocalStorage()
    }


    return (
        <div className={!error ? 'count' : 'count error'}>
            {settings && <div className='title'>
                {!error
                    ? <span>Enter values, press set and press 🛠 </span>
                    : <span className='error-value'>{error}</span>}
            </div>}

            <div className='display'>
                {
                    !settings
                        ? <Output value={outputValue} maxValue={count.maxValue}/>
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
                                disabled={outputValue === count.maxValue}
                                onClick={incrOutputValue}>inc</Button>
                            <Button
                                className='count-btn'
                                disabled={outputValue === count.minValue}
                                onClick={resetOutputValue}>reset</Button>
                        </>
                        : <Button className='count-btn'
                                  onClick={updateConfig}
                                  disabled={isSetChanged || !!error}>set</Button>
                }

                <SettingsSvg callback={changeSettings}/>


            </div>
        </div>
    );
};

