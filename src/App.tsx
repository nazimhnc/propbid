import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { HomePage } from './pages/HomePage';
import { PropertyPage } from './pages/PropertyPage';
import { RegisterPage } from './pages/RegisterPage';
import { SubmitOfferPage } from './pages/SubmitOfferPage';
import { OfferConfirmationPage } from './pages/OfferConfirmationPage';

export interface AuthState {
  isRegistered: boolean;
  user: {
    fullName: string;
    email: string;
    emiratesId: string;
  } | null;
}

function App() {
  const [auth, setAuth] = useState<AuthState>({
    isRegistered: false,
    user: null,
  });

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar auth={auth} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/property/:id" element={<PropertyPage auth={auth} />} />
          <Route path="/register" element={<RegisterPage onRegister={setAuth} />} />
          <Route path="/offer/:id" element={<SubmitOfferPage auth={auth} />} />
          <Route path="/offer-confirmed" element={<OfferConfirmationPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
