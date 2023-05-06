import { Provider } from 'react-redux';
import { store } from '../../app/general/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from './Router';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router />
      <ToastContainer autoClose={5000} />
    </Provider>
  );
};

export default App;
