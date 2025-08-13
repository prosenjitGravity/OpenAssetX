import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'material-icons/iconfont/material-icons.css';
import HomePage from './components/home/home-page';
import LoginPage from './components/login'
import Registration from './components/registeration';
import Dashboard from './components/dashboard';
import BuyTokensPage from './components/buy-token';
import MarketPlace from './components/market-place';
import AssetsById from './components/assets-details';
import AddNewAsset from './components/add-new-asset';
import UserProfilePage from './components/user-profile';
import MyAssetDetailsPage from './components/my-asset-details';
import EditAssetPage from './components/edit-asset-details';
import TransactionHistoryPage from './components/transaction-history';
import LearnPage from './components/learn-page';
import AboutPage from './components/about'; 
import HelpCenter from './components/help-desk';
import ContactUs from './components/contact-us';


function App() {
  return (
        <BrowserRouter>
      <div >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/marketplace" element={<MarketPlace />} />
          <Route path="/buy-tokens" element={<BuyTokensPage />} />
          <Route path="/asset/:id" element={<AssetsById />} />
          <Route path="/add-new-asset" element={<AddNewAsset />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/my-asset-details" element={<MyAssetDetailsPage />} />
          <Route path="/edit-asset-details" element={<EditAssetPage />} />
          <Route path="/transactions" element={<TransactionHistoryPage />} />
          <Route path="/learn-openassetx" element={<LearnPage />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
