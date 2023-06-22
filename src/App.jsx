import React from "react";
import Home from "./views/Home";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ProductList from "./views/Buy";
import Register from "./views/SignUp/RegisterForm";
import LoginForm from "./views/SignIn/LoginForm";
import Cart from "./views/Cart";
import Egerie from "./views/Egerie";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/boutique" element={<ProductList />} />
          <Route path="/egerie" element={<Egerie />} />
          <Route path={"/connexion"} element={<LoginForm />} />
          <Route path={"/inscription"} element={<Register />} />
          <Route path="/panier" element={<Cart />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}
