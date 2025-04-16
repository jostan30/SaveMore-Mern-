
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App.tsx'
import RetailersConsole from "./components/page/RetailersConsole.tsx";
import Shop from "./components/page/Shop.tsx";
import ProtectedRoute from "./components/personal/ProtectedRoute.tsx";
import Cart from "./components/page/Cart.tsx";
import Footer from "./components/personal/Footer.tsx";
import PurchasedProducts from "./components/page/PurchasedProducts.tsx"
import BuyerChatPage from "./components/page/BuyerChatPage.tsx";
import DeliveryAgentForm from "./components/page/Delivery.tsx";
import SellerChatPage from "./components/page/SellerChatPage.tsx";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<App />} />

        {/* Retailer dashboard */}
        <Route path="/retailers/*" element={<ProtectedRoute userType="owner"><RetailersConsole /></ProtectedRoute>} />

        <Route
         path="/chat/buyer/:productId" 
         element={<ProtectedRoute userType="user"> <BuyerChatPage /></ProtectedRoute>} />

<Route
         path="/chat/seller" 
         element={<ProtectedRoute userType="owner"> <SellerChatPage /></ProtectedRoute>} />

        <Route path="deliveryRegister">
          <Route index
            element={
                <DeliveryAgentForm />
                <Footer/>
              } />
          {/* Add nested routes here as needed */}
        </Route>


        {/* User's dashboard */}
        <Route path="users">
          <Route index
            element={
              <ProtectedRoute userType="user">
                <Shop />
                <Footer/>
              </ProtectedRoute>
            } />
          {/* Add nested routes here as needed */}
          <Route path="/users/cart" element={
            <ProtectedRoute userType="user">
              <Cart />
              <Footer/>
            </ProtectedRoute>
          } />
          <Route path="/users/buyProducts" element={
            <ProtectedRoute userType="user">
              <PurchasedProducts />
              <Footer/>
            </ProtectedRoute>
          } />
        </Route>
       
        

      </Routes>
    </BrowserRouter>
  );
   
} else {
  console.error("Root element not found. Please check your HTML file.");
}