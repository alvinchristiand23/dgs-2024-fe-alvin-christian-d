import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalStateProvider } from './contexts/GlobalStateContext';
import AppRoutes from './routers/AppRoutes';

function App() {
  return (
    <GlobalStateProvider>
      <AppRoutes />
      <ToastContainer />
    </GlobalStateProvider>
  );
}

export default App;
