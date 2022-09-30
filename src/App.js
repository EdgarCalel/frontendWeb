import React, { useState, useEffect } from "react";
import {
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import Clientes from "./components/clientes"
import Caja from "./components/caja"
import Compras from "./components/compras"
import Productos from "./components/Productos"
import Reportes from "./components/reportes"
import Usuarios from "./components/Usuarios"
import Navbar from "./components/navbar"
import Proveedor from "./components/proveedores"
import Ventas from "./components/ventas"
import Login from "./components/login"
import "./App.css"

const App = () => {
  const [authStorage, setAuthStorage] = useState([]);
  const getAuth = () =>{
    if(!localStorage.getItem("auth")){
      setAuthStorage(false)
    }else{
      const auth = JSON.parse(localStorage.getItem('auth'))
      console.log(auth)
      if (auth ==='yes') {
        setAuthStorage(true)
      }else{
        setAuthStorage(false)
      }
    }
  }
console.log(authStorage)
  useEffect(() => {
    getAuth();
  }, []);
  return (
    <div className='appRouter'>
      
      {authStorage ? 
      <>
      <Navbar />
      <Routes>
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/Compras" element={<Compras />} />
        <Route path="/Productos" element={<Productos />} />
        <Route path="/Reportes" element={<Reportes />} />
        <Route path="/Usuarios" element={<Usuarios />} />
        <Route path="/Caja" element={<Caja />} />
        <Route path="/Proveedor" element={<Proveedor />} />
        <Route path="/Ventas" element={<Ventas />} />
      </Routes>
      </>
        : <> 
        <Login /> 
        
        </>  }        
    </div>
  );
}

export default App;
