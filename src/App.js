import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/home/home';
import Productcategory from './components/pages/Productcategory/Productcategory'
import Card from "./components/pages/Cart/Cart";
import Product  from "./components/pages/Product/Product";
import Adminpanel from "./components/pages/Adminpanel/Adminpanel";
import Allproduct from "./components/pages/Allproducts/Allproducts";
import Search from "./components/pages/Search/Search";
import User from "./components/pages/User/User";

function App() {
  return (
    <Routes>
      <Route path="/react" element={<Home />} />
      <Route path="/react/productcategory/:category" element={<Productcategory />} />
      <Route path="/react/allproduct" element={<Allproduct />} />
      <Route path="/react/Search/:resultsearch" element={<Search />} />
      <Route path="/react/user" element={<User />} />
      <Route path="/react/Card" element={<Card />} />
      <Route path="/react/Product/:id" element={<Product />} />
      <Route path="/react/Adminpanel" element={<Adminpanel />} />
    </Routes>
  );
}

export default App;
