import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../Store';

const useAppDispatch = () => useDispatch<AppDispatch>();

export {
    useAppDispatch
}
