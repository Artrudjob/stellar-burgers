import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {RootState, AppDispatch, AppThunk} from '../store';

export const useAppDispatch = () => useDispatch<AppDispatch | AppThunk>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;