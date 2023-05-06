import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { tRootState, tAppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<tAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<tRootState> = useSelector;
