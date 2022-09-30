import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios';
const {
  REACT_APP_SERVER,
} = process.env;

function Cliente() {
  const [Clientes, setClientes] = useState([]);
  const [input, setInput] = useState({
    nombre: '',
    apellido: '',
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
     await axios.post(`${REACT_APP_SERVER}/clientes/create`, input);
  }
  useEffect(() => {
    getClientes();
  }, []);
  const getClientes = async () => {
    const { data } = await axios.get(`${REACT_APP_SERVER}/clientes`);
    setClientes(data);
  };
  return (
    <div className='container cuadroPrincipal'>
      <h2>Clientes</h2>
      {console.log(input)}
      <div>
        <Link type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#CreateClient">
          <span class="material-symbols-outlined center">
            add_circle
          </span>
          Crear
        </Link>
      </div>

      <div className="modal fade" id="CreateClient" tabindex="-1" aria-labelledby="CreateClientLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
              <form onSubmit={(e) => handleSubmit(e)}>
              
              <div className="modal-header">
              <h5 className="modal-title" id="CreateClientLabel">Registrar cliente</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div className="row mb-3">
                  <div className="col">
                  <input className="form-control" type="text" value={input.nombre} name="nombre" placeholder="Escriba el nombre" onChange={(e) => handleChange(e)}/>
                  </div>
                  <div class="col">
                  <input className="form-control" type="text" value={input.apellido} name="apellido" placeholder="Escriba el apellido" onChange={(e) => handleChange(e)}/>
                  </div>
                </div>
                <div className="row mb-3">
                  <div class="col">
                  <input className="form-control" type="text" value={input.nit} name="nit" placeholder="Escriba el nit" onChange={(e) => handleChange(e)}/>
                  </div>
                  <div class="col">
                  <input className="form-control" type="text" value={input.telefono} name="telefono" placeholder="Escriba el telefono" onChange={(e) => handleChange(e)}/>
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
            <th scope="col">Apellido</th>
            <th scope="col">Nit</th>
            <th scope="col">Direccion</th>
          </tr>
        </thead>
        <tbody>
          {Clientes?.data?.map((item, index) => (
            <tr key={index}>
              <th scope="col">{item.id}</th>
              <th scope="col">{item.nombre}</th>
              <th scope="col">{item.apellido}</th>
              <th scope="col">{item.nit}</th>
              <th scope="col">{item.direccion}</th>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  )
}

export default Cliente
