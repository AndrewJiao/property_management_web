import {TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector} from "react-redux";
import {AppDispatch, RootState} from "./store";


export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
export const useDispatch = () => useReduxDispatch<AppDispatch>()

