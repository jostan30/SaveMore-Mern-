
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App.tsx'
import RetailersConsole from "./components/page/RetailersConsole.tsx";
import Shop from "./components/page/Shop.tsx";
import ProtectedRoute from "./components/personal/ProtectedRoute.tsx";


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

        {/* User's dashboard */}
        <Route path="users">
          <Route index
            element={
              <ProtectedRoute userType="user">
                <Shop />
              </ProtectedRoute>
            } />
          {/* Add nested routes here as needed */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
} else {
  console.error("Root element not found. Please check your HTML file.");
}