

// Types
export type ActionType =
    | ReturnType<typeof setSettingsAC>
    | ReturnType<typeof incrOutputAC>
    | ReturnType<typeof resetOutputAC>
    | ReturnType<typeof changeSettingsAC>

type CountStateType = {
    minValue: number
    maxValue: number
    outputValue: number
    settings: boolean


}
const initialState: CountStateType = {
    minValue: 0,
    maxValue: 5,
    outputValue: 0,
    settings: false,
}

// Reducer
export  const countReducer = (state: CountStateType = initialState, action: ActionType): CountStateType => {
    switch (action.type) {
        case 'SET_SETTINGS': {
            return {
                ...state,
                minValue: action.payload.minValue,
                maxValue: action.payload.maxValue,
                outputValue: action.payload.minValue,
                settings: false
            }
        }
        case 'INCR_OUTPUT': {
            return {
                ...state,
                outputValue: state.outputValue + 1
            }
        }
        case "RESET_OUTPUT": {
            return {
                ...state,
                outputValue: state.minValue
            }
        }
        case "CHANGE_SETTINGS": {
            return {
                ...state,
                settings: !state.settings
            }
        }
        default:
            return state;
    }
}
// Action creators
export const setSettingsAC = (minValue: number, maxValue: number) => ({type: 'SET_SETTINGS', payload: {minValue, maxValue}}as const);
export const incrOutputAC = () => ({type: 'INCR_OUTPUT'} as const);
export const resetOutputAC = () => ({type: 'RESET_OUTPUT'} as const);
export const changeSettingsAC = () => ({type: 'CHANGE_SETTINGS'} as const);




