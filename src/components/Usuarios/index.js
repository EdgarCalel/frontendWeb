import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios';
const {
  REACT_APP_SERVER,
} = process.env;

function Usuarios() {
  const [Usuarios, setUsuarios] = useState([]);
  const [Rol, setRol] = useState([]);
  const [input, setInput] = useState({
    nombre: '',
    apellido: '',
    id_rol: '',
    direccion: '',
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  const handleSubmit = async () => {
    await axios.post(`${REACT_APP_SERVER}/usuarios/create`, input);
  }
  useEffect(() => {
    getUsuarios();
    getRoles()
  }, []);
  const getUsuarios = async () => {
    const { data } = await axios.get(`${REACT_APP_SERVER}/usuarios`);
    setUsuarios(data);
  };
  const getRoles = async () => {
    const { data } = await axios.get(`${REACT_APP_SERVER}/roles`);
    setRol(data);
  };
  return (
    <div className='container cuadroPrincipal'>
      <h2>Usuarios</h2>
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
                <h5 className="modal-title" id="CreateproveedorLabel">Registrar Usuario</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div className="row mb-3">
                  <div className="col">
                    <input className="form-control" type="text" value={input.nombre} name="nombre" placeholder="Escriba el nombre" onChange={(e) => handleChange(e)} />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <input className="form-control" type="text" value={input.apellido} name="apellido" placeholder="Escriba el apellido" onChange={(e) => handleChange(e)} />
                  </div>
                </div>

                <div className="row mb-3">
                  <div class="col-12 col-md col-sm-12 col-xs-12">

                    <select class="form-select mb-3" defaultValue={input?.id_rol} name="id_rol" onChange={(e) => handleChange(e)} >
                      <option selected disabled>seleccione rol</option>
                      {
                        Rol?.data?.map((el, index) => (
                          <option key={index} value={el.id}>{`${el.name}`}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
                <div class="col">
                  <input className="form-control" type="text" value={input.direccion} name="direccion" placeholder="Escriba el direccion" onChange={(e) => handleChange(e)} />
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
          
            <th scope="col">Direccion</th>
            <th scope="col">Username</th>
          </tr>
        </thead>
        <tbody>
          {Usuarios?.data?.map((item, index) => (
            <tr key={index}>
              <th scope="col">{index + 1}</th>
              <th scope="col">{item.nombre} {item.apellido}</th>
    
              <th scope="col">{item.direccion}</th>
              <th scope="col">{item.useraccess}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Usuarios
