import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios';
const {
  REACT_APP_SERVER,
} = process.env;

function Producto() {
  const [Producto, setProducto] = useState([]);
  const [Proveedor, setProveedor] = useState([]);
  const [estado, setPestado] = useState([]);


  const [input, setInput] = useState({
    nombre: '',
    codigo: '',
    idestado:'',
    fecha:'',
    precio:0, 
    costo:0, 
    existencia:0, 
    idproveedor:'',
    telefono: '',

  });


 useEffect(() => {
    getproveedores();
    getProducto();
  }, []);
  const getproveedores = async () => {
    const { data } = await axios.get(`${REACT_APP_SERVER}/proveedor`);
    setProveedor(data);
  };

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  const handleSubmit =async () => {
     await axios.post(`${REACT_APP_SERVER}/producto/create`, input);
  }

  const getProducto = async () => {
    const { data } = await axios.get(`${REACT_APP_SERVER}/producto`);
    setProducto(data);
  };
  return (
    <div className='container cuadroPrincipal'>
      <h2>Producto</h2>
     
      <div>
        <Link type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#CreateProducto">
          <span class="material-symbols-outlined center">
            add_circle
          </span>
          Crear
        </Link>
        
      </div>

      <div className="modal fade" id="CreateProducto" tabindex="-1" aria-labelledby="CreateProductoLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
          <div className="modal-content">
              <form onSubmit={(e) => handleSubmit(e)}>
              
              <div className="modal-header">
              <h5 className="modal-title" id="CreateProductoLabel">Registrar Producto</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div className="row mb-3">
                  <div class="col-12 col-md col-sm-12 col-xs-12">
                  <label className="form-label">Codigo</label>
                  <input className="form-control" type="text" value={input.codigo} name="codigo" placeholder="Escriba el codigo" onChange={(e) => handleChange(e)}/>
                  </div>
                  <div className="col-12 col-md col-sm-12 col-xs-12">
                  <label className="form-label">Nombre</label>
                  <input className="form-control" type="text" value={input.nombre} name="nombre" placeholder="Escriba el nombre" onChange={(e) => handleChange(e)}/>
                  </div>
                  <div class="col-12 col-md col-sm-12 col-xs-12">
                  <label className="form-label">Estado</label>
                  <select class="form-select mb-3" defaultValue={input.idestado} name="idestado"  onChange={(e) => handleChange(e)} >
                    <option selected>estado del producto</option>
                    <option value="1">Activo</option>
                    <option value="0">Inactivo</option>
                  </select>
                  </div>
                </div>
                <div className="row mb-3">
                
                  <div class="col-12 col-md col-sm-12 col-xs-12">
                  <label className="form-label">Fecha</label>
                  <input className="form-control" type="date" value={input.fecha} name="fecha" placeholder="Escriba el fecha" onChange={(e) => handleChange(e)}/>
                  </div>
                </div>
                <div className="row mb-3">
                  <div class="col-12 col-md col-sm-12 col-xs-12">
                  <label className="form-label">Precio</label>
                  <input className="form-control" type="number" value={input.precio} name="precio" placeholder="Escriba la precio" onChange={(e) => handleChange(e)}/>
                  </div>
                  <div class="col-12 col-md col-sm-12 col-xs-12">
                  <label className="form-label">Costo</label>
                  <input className="form-control" type="number" value={input.costo} name="costo" placeholder="Escriba la costo" onChange={(e) => handleChange(e)}/>
                  </div>
                </div>
                <div className="row mb-3">
                  <div class="col-12 col-md col-sm-12 col-xs-12">
                  <label className="form-label">Existencia</label>
                  <input className="form-control" type="number" value={input.existencia} name="existencia" placeholder="Escriba la existencia" onChange={(e) => handleChange(e)}/>
                  </div>
                  <div class="col-12 col-md col-sm-12 col-xs-12">
                  <label className="form-label">Proveedor</label>
                  <select class="form-select mb-3" defaultValue={input?.idproveedor} name="idproveedor"  onChange={(e) => handleChange(e)} >
                    <option selected></option>
                    {
                     Proveedor?.data?.map((el, index)=>(
                       <option key={index} value={el.id}>{el.nombre}</option>
                      ))
                    }
                  </select>
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
            <th scope="col">Costo</th>
            <th scope="col">Precio</th>
            <th scope="col">Existencia</th>
            {/* <th scope="col"></th> */}

          </tr>
        </thead>
        <tbody>
          {Producto?.data?.map((item, index) => (
            <tr key={index}>
              <th scope="col">{item.codigo}</th>
              <th scope="col">{item.nombre}</th>
              <th scope="col">{item.costo}</th>
              <th scope="col">{item.precio}</th>
              <th scope="col">{item.existencia}</th>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  )
}

export default Producto
