import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css"
import LogoNavbar from "./logoNavbar.jpg"
function Index() {
 
  const DirectionsNavbar = [
    { nombre: 'Ventas', link: "/Ventas", icon: "assignment_ind" },
    { nombre: 'Compras', link: "/Compras", icon: "inventory" },
    { nombre: 'Clientes', link: "/clientes", icon: "groups" },
    { nombre: 'Productos', link: "/Productos", icon: "category" },
    { nombre: 'Proveedor', link: "/Proveedor", icon: "assignment_ind" },
    { nombre: 'Usuarios', link: "/Usuarios", icon: "assignment_ind" },
    { nombre: 'Caja', link: "/Caja", icon: "assignment_ind" },
    // { nombre: 'Reportes', link: "/Reportes", icon: "description" },
  ]
const cerrarSession=()=>{
  localStorage.clear()
  window.location.reload()
}
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <a class="navbar-brand" >
            <img className='img-thumbnail logoNavbar' src={LogoNavbar} alt="not found" />
          </a>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              {DirectionsNavbar.map((item, index) => (
                <li class="nav-item">
                  <Link class="nav-link active" aria-current="page" to={item.link}>
                    <span class="material-symbols-outlined" style={{padding:"10px"}}>{item.icon}</span>
                    {item.nombre}
                  </Link>
                </li>
              ))}
            </ul>
            <div class="d-flex" role="search">
        
        <button 
          class="btn btn-outline-danger" 
          type="submit"
          onClick={()=>{cerrarSession()}}>Log Out</button>
      </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Index
