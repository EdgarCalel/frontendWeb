import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios';
const {
  REACT_APP_SERVER,
} = process.env;

function Caja() {
  const [caja, setcaja] = useState([]);
  const [input, setInput] = useState({
    idcaja:'',
    fecha:'',
    descripcion:'',
    montoI:''
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  const handleSubmit =async () => {
     await axios.post(`${REACT_APP_SERVER}/caja/create`, input);
  }
  useEffect(() => {
    getcaja();
  }, []);
  const getcaja = async () => {
    const { data } = await axios.get(`${REACT_APP_SERVER}/caja`);
    setcaja(data);
  };
  return (
    <div className='container cuadroPrincipal'>
      <h2>caja</h2>
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
              <h5 className="modal-title" id="CreateClientLabel">Registrar movimiento</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div className="row mb-3">
                  <div className="col">
                  <select class="form-select mb-3" value={input?.idcaja} name="idcaja" onChange={(e) => handleChange(e)} >
                      <option selected disabled >seleccione Caja</option>                
                      <option value="cajaPrincipal">Caja Principal</option>
                      <option value="caja01">Caja 01</option>
                    </select>
                  </div>
                  <div class="col">
                  <input className="form-control" type="date" value={input.fecha} name="fecha" placeholder="Escriba el fecha" onChange={(e) => handleChange(e)}/>
                  </div>
                </div>
                <div className="row mb-3">
                  <div class="col">
                  <input className="form-control" type="number" value={input.montoI} name="montoI" placeholder="Escriba el montoI" onChange={(e) => handleChange(e)}/>
                  </div>
                  <div class="col">
                  <input className="form-control" type="text" value={input.descripcion} name="descripcion" placeholder="Escriba el descripcion" onChange={(e) => handleChange(e)}/>
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
            <th scope="col">Caja</th>
            <th scope="col">Monto</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Saldo</th>
          </tr>
        </thead>
        <tbody>
          {caja?.data?.map((item, index) => (
            <tr key={index}>
              <th scope="col">{index+1}</th>
              <th scope="col">{item.idcaja}</th>
              <th scope="col">{item.monto}</th>
              <th scope="col">{item.descripcion}</th>
              <th scope="col">{item.saldo}</th>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  )
}

export default Caja

