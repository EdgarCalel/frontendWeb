import React, { useState, useEffect } from "react";

import axios from 'axios';

const {
  REACT_APP_SERVER,
} = process.env;

function Ventas() {
  const [Producto, setProducto] = useState([]);
  const [Clientes, setclientes] = useState([]);
  const [ventaFinal, setventaFinal] = useState([]);

  const [inputVen, setInputVen] = useState({
    total: 0,
    fecha: '',
    idstate: '',
    id_cliente: ''
  });

  const [detVenta, setDetVenta] = useState({
    precio_unitario: '',
    cantidad: '',
    idproducto: ''
  })

  useEffect(() => {
    getclientes();
    getproductos();
  }, []);
  const getclientes = async () => {
    const { data } = await axios.get(`${REACT_APP_SERVER}/clientes`);
    setclientes(data);
  };
  const getproductos = async () => {
    const { data } = await axios.get(`${REACT_APP_SERVER}/producto`);
    setProducto(data);
  };

  function handleChange(e) {
    setInputVen({
      ...inputVen,
      [e.target.name]: e.target.value
    })
  }
 

  function handleChangedet(e) {
    setDetVenta({
      ...detVenta,
      [e.target.name]: e.target.value,
    })

  }
  const handleSubmitencabezado = async (e) => {
    e.preventDefault();
    await axios.post(`${REACT_APP_SERVER}/ventas/create`, inputVen);
    document.getElementById("encabezado").disabled = true;
    document.getElementById("encabezado1").disabled = true;
    document.getElementById("encabezado2").disabled = true;
    document.getElementById("encabezadobuton").style.display = 'none';
  }
  const handleSubmitDetalle = async (e) => {
      e.preventDefault();
      setventaFinal([
        ...ventaFinal,
        detVenta
      ])
      setDetVenta({
          precio_unitario: 0,
          cantidad: '',
          idproducto: '' 
      })
    // await axios.post(`${REACT_APP_SERVER}/compras/create`, inputVen);
  }

  const Facturar = async (e) => {

    await axios.post(`${REACT_APP_SERVER}/ventas/createDetalle`, ventaFinal);
    window.location.reload(true);
  }

  
  return (
    <div className='container cuadroPrincipal'>
      <h2>Ventas</h2>
      <hr />
      {
      }
      <form id="compraskll" onSubmit={(e) => handleSubmitencabezado(e)}>
        <div class="modal-body">
          <div className="container row mb-3">
            <div class="col-12 col-md col-sm-12 col-xs-12">
              <label className="form-label">Nombre</label>
              <select id="encabezado" class="form-select mb-3" defaultValue={inputVen?.id_cliente} name="id_cliente" onChange={(e) => handleChange(e)} required >
                <option selected disabled>seleccione cliente</option>
                {
                  Clientes?.data?.map((el, index) => (
                    <option key={index} value={el.id}>{`${el.nombre} ${el.apellido}`}</option>
                  ))
                }
              </select>
              {/* creacion de proveedor */}
              {/* <Link type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#CreateProducto">
                <span class="material-symbols-outlined center">
                  add_circle
                </span>

              </Link> */}
            </div>
            <div class="col-12 col-md col-sm-12 col-xs-12">
              <label className="form-label">Estado</label>
              <select id="encabezado1" class="form-select mb-3" defaultValue={inputVen.idstate} name="idstate" onChange={(e) => handleChange(e)} required >
                <option selected>estado de la factura</option>
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
              </select>
            </div>
            <div class="col-12 col-md col-sm-12 col-xs-12">
              <label className="form-label">Fecha</label>
              <input id="encabezado2" className="form-control" type="date" value={inputVen.fecha} name="fecha" placeholder="Escriba el fecha" onChange={(e) => handleChange(e)} required />
            </div>
            <div class="col-12 col-md col-sm-12 col-xs-12"><br />

              <input id="encabezadobuton" className="btn btn-success m-1" type="submit" />

            </div>
          </div>
        </div>
      </form>

      <div>
        <hr />
        Detalle de productos seleccionados
        <hr />
        {/* detalle de venta */}
        <form id="compraskll" onSubmit={(e) => handleSubmitDetalle(e)}>
          <div class="modal-body">
            <div className="container row mb-3">
              <div class="col-12 col-md col-sm-12 col-xs-12">
                <label className="form-label">Nombre producto</label>
                <select class="form-select mb-3" defaultValue={detVenta?.idproducto} name="idproducto" onChange={(e) => handleChangedet(e)} >
                  <option selected>seleccione producto</option>
                  {
                    Producto?.data?.map((el, index) => (
                      <option key={index} value={el.id}>{`${el.nombre}`}</option>
                    ))
                  }
                </select>
              </div>
              <div class="col-12 col-md col-sm-12 col-xs-12">
                <label className="form-label">Cantidad</label>
                <input className="form-control" type="number" value={detVenta.cantidad} name="cantidad" placeholder="cantidad" onChange={(e) => handleChangedet(e)} required />
              </div>
              <div class="col-12 col-md col-sm-12 col-xs-12">
                <label className="form-label">precio</label>
                <input className="form-control" type="number" value={detVenta.precio_unitario} name="precio_unitario"  onChange={(e) => handleChangedet(e)} required />
              </div>
              <div class="col-12 col-md col-sm-12 col-xs-12">
                {/* <label className="form-label">Total</label>
                  <input className="form-control" type="number" value={inputVen.existencia} name="total" placeholder="0" onChange={(e) => handleChange(e)}/> */}<br />
                <input className="btn btn-success m-1" type="submit" />
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="container">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">codigo</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Total</th>

            </tr>
          </thead>
          <tbody>
            {ventaFinal?.map((item, index) => (
              <tr key={index}>
                <th scope="col">{index + 1}</th>

                <th scope="col">{item.idproducto}</th>
                <th scope="col">{item.cantidad}</th>
                <th scope="col">{item.cantidad * item.precio_unitario}</th>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
      <div>
        <button type="button" class="btn btn-success" onClick={(e) => Facturar(e)} >facturar</button>
      </div>
    </div>
  )
}

export default Ventas
