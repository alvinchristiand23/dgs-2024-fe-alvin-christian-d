import AppRouters from './routers/AppRouters';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <AppRouters />
      <ToastContainer />
    </div>
  );
}

export default App;
