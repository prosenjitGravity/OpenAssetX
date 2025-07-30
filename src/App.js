import './App.css';
import HomePage from './components/home-page';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/login'
import Registration from './components/registeration';
import Dashboard from './components/dashboard';
import BuyTokensPage from './components/buy-token';
import MarketPlace from './components/market-place';
import AssetsById from './components/assets-details';
import AddNewAsset from './components/add-new-asset';


function App() {
  return (
        <BrowserRouter>
      <div >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/marketplace" element={<MarketPlace />} />
          <Route path="/buy-tokens" element={<BuyTokensPage />} />
          <Route path="/asset/:id" element={<AssetsById />} />
          <Route path="/add-new-asset" element={<AddNewAsset />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
