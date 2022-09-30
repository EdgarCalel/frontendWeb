import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios';
const {
  REACT_APP_SERVER,
} = process.env;

function Proveedores() {
  const [proveedores, setproveedores] = useState([]);
  const [input, setInput] = useState({
    nombre: '',
    direccion: '',
    nit: '',
    telefono: '',
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  const handleSubmit =async () => {
     await axios.post(`${REACT_APP_SERVER}/proveedor/create`, input);
  }
  useEffect(() => {
    getproveedores();
  }, []);
  const getproveedores = async () => {
    const { data } = await axios.get(`${REACT_APP_SERVER}/proveedor`);
    setproveedores(data);
  };
  return (
    <div className='container cuadroPrincipal'>
      <h2>proveedores</h2>
      {console.log(input)}
      <div>
        <Link type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#Createproveedor">
          <span class="material-symbols-outlined center">
            add_circle
          </span>
          Crear
        </Link>
      </div>

      <div className="modal fade" id="Createproveedor" tabindex="-1" aria-labelledby="CreateproveedorLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
              <form onSubmit={(e) => handleSubmit(e)}>
              
              <div className="modal-header">
              <h5 className="modal-title" id="CreateproveedorLabel">Registrar proveedore</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div className="row mb-3">
                  <div className="col">
                  <input className="form-control" type="text" value={input.nombre} name="nombre" placeholder="Escriba el nombre" onChange={(e) => handleChange(e)}/>
                  </div>
                </div>
                <div className="row mb-3">
                  <div class="col">
                  <input className="form-control" type="text" value={input.nit} name="nit" placeholder="Escriba el nit" onChange={(e) => handleChange(e)}/>
                  </div>
                  <div class="col">
                  <input className="form-control" type="number" value={input.telefono} name="telefono" placeholder="Escriba el telefono" onChange={(e) => handleChange(e)}/>
                  </div>
                </div>
                <div className="row mb-3">
                  <div class="col">
                  <input className="form-control" type="text" value={input.direccion} name="direccion" placeholder="Escriba la direccion" onChange={(e) => handleChange(e)}/>
                  </div>
                </div>


            </div>
            <div class="modal-footer">
            <button className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                  <button className="btn btn-success m-1" type="submit">
                    Guardar
                  </button>
            </div>
              </form>
          </div>
        </div>
      </div>
      <hr />
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Nit</th>
            <th scope="col">Direccion</th>
          </tr>
        </thead>
        <tbody>
          {proveedores?.data?.map((item, index) => (
            <tr key={index}>
              <th scope="col">{item.id}</th>
              <th scope="col">{item.nombre}</th>
              <th scope="col">{item.nit}</th>
              <th scope="col">{item.direccion}</th>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  )
}

export default Proveedores
