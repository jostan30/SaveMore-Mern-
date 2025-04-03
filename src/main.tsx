
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App.tsx'
import RetailersConsole from "./components/page/RetailersConsole.tsx";
import Shop from "./components/page/Shop.tsx";
import ProtectedRoute from "./components/personal/ProtectedRoute.tsx";
import Cart from "./components/page/Cart.tsx";
import PurchasedProducts from "./components/page/PurchasedProducts.tsx"
import { PurchasedProductsView } from "./components/personal/OrderRetailer.tsx";
import DeliveryAgentForm from "./components/page/Delivery.tsx";
const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<App />} />

        {/* Retailer dashboard */}
        <Route path="retailers">
          <Route index
            element={
              <ProtectedRoute userType="owner">
                <RetailersConsole />
              </ProtectedRoute>} />
          {/* Add nested routes here as needed */}
        </Route>
        <Route path="retailers/orders">
          <Route index
            element={
              <ProtectedRoute userType="owner">
                <PurchasedProductsView />
              </ProtectedRoute>} />
          {/* Add nested routes here as needed */}
        </Route>

        <Route path="deliveryRegister">
          <Route index
            element={
             
                <DeliveryAgentForm />
              } />
          {/* Add nested routes here as needed */}
        </Route>


        {/* User's dashboard */}
        <Route path="users">
          <Route index
            element={
              <ProtectedRoute userType="user">
                <Shop />
              </ProtectedRoute>
            } />
          {/* Add nested routes here as needed */}
          <Route path="/users/cart" element={
            <ProtectedRoute userType="user">
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/users/buyProducts" element={
            <ProtectedRoute userType="user">
              <PurchasedProducts />
            </ProtectedRoute>
          } />
        </Route>
       
        

      </Routes>
    </BrowserRouter>
  );
   
} else {
  console.error("Root element not found. Please check your HTML file.");
}