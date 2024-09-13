import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Finance from '../pages/Finance';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <MainLayout>
              <Finance />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
