import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios';
const {
  REACT_APP_SERVER,
} = process.env;

function Compras() {
  const [encaVenta, setEncaVenta] = useState([])
  const [Producto, setProducto] = useState([]);
  const [proveedor, setproveedor] = useState([]);
  const [ventaFinal, setventaFinal] = useState([]);

  const [inputVen, setInputVen] = useState({
    total: 0,
    fecha: '',
    idstate: '',
    proveedorid: ''
  });

  const [detVenta, setDetVenta] = useState({
    costo_unitario: '',
    cantidad: '',
    idproducto: ''
  })

  useEffect(() => {
    getproveedores();
    getproductos();
  }, []);
  const getproveedores = async () => {
    const { data } = await axios.get(`${REACT_APP_SERVER}/proveedor`);
    setproveedor(data);
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
  function limpiarFormulario() {

    setInputVen({
      total: 0,
      fecha: '',
      idstate: '',
      proveedorid: ''
    })
    setDetVenta({
      costo_unitario: '',
      cantidad: '',
      idproducto: ''
    })

  }

  const handleSubmitencabezado = async (e) => {
    e.preventDefault();
    await axios.post(`${REACT_APP_SERVER}/compras/create`, inputVen);
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
    // await axios.post(`${REACT_APP_SERVER}/compras/create`, inputVen);
  }

  const Facturar = async (e) => {

    await axios.post(`${REACT_APP_SERVER}/compras/createDetalle`, ventaFinal);
    window.location.reload(true);
  }

  const getProducto = async () => {
    const { data } = await axios.get(`${REACT_APP_SERVER}/producto`);

  };
  return (
    <div className='container cuadroPrincipal'>
      <h2>Compras</h2>

      <div>


      </div>
      <hr />
      {

      }
      <form id="compraskll" onSubmit={(e) => handleSubmitencabezado(e)}>
        <div class="modal-body">
          <div className="container row mb-3">
            <div class="col-12 col-md col-sm-12 col-xs-12">
              <label className="form-label">Nombre</label>
              <select id="encabezado" class="form-select mb-3" defaultValue={inputVen?.proveedorid} name="proveedorid" onChange={(e) => handleChange(e)} required >
                <option selected>seleccione proveedor</option>
                {
                  proveedor?.data?.map((el, index) => (
                    <option key={index} value={el.id}>{`${el.nombre}`}</option>
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
                <label className="form-label">Costo</label>
                <input className="form-control" type="number" value={detVenta.costo_unitario} name="costo_unitario" placeholder="costo" onChange={(e) => handleChangedet(e)} required />
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
              <th scope="col">Costo</th>
              <th scope="col">Total</th>

            </tr>
          </thead>
          <tbody>
            {ventaFinal?.map((item, index) => (
              <tr key={index}>
                <th scope="col">{index + 1}</th>

                <th scope="col">{item.idproducto}</th>
                <th scope="col">{item.cantidad}</th>
                <th scope="col">{item.costo_unitario}</th>
                <th scope="col">{item.cantidad * item.costo_unitario}</th>
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

export default Compras
