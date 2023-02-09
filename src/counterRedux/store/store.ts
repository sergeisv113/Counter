import {combineReducers, createStore} from "redux";
import {countReducer} from "./countReducer";


//мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    count: countReducer
})
//создаем store
export const store = createStore(rootReducer)
//определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>