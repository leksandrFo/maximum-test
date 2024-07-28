import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchStock } from './redux/slices/stockSlice';
import { fetchBrands } from './redux/slices/brandsSlice';
import Stock from './components/Stock';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStock());
    dispatch(fetchBrands());
  }, [dispatch]);
  
  return (
    <div className="App">
        <Stock />
    </div>
);
}

export default App;