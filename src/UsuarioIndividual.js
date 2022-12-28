import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function UsuarioIndividual({ usuario }) {
  const navegar = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Para animación de scroll al bajar
  useEffect(() => {
    AOS.init();
  }, []);

  //Función para borrar usuario
  function borrarusuario(idusuario) {
    axios
      .post("/api/usuario/borrarusuario", { idusuario: idusuario })
      .then((res) => {
        console.log(res.data);
        alert(res.data);
        navegar(0);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 offset-3" data-aos="flip-right">
          <ul className="list-group">
            <li className="list-group-item">{usuario.nombre}</li>
          </ul>
          <Link to={`/editarusuario/${usuario.idusuario}`}>
            <li className="btn btn-success">Editar</li>
          </Link>
          &nbsp;
          <button
            className="btn btn-danger"
            onClick={() => {
              borrarusuario(usuario.idusuario);
            }}
          >
            Borrar
          </button>
          <hr className="mt-4"></hr>
          <Button variant="primary" onClick={handleShow}>
            Informacion
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Info. del usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <span>Nombre: </span>
              <li className="list-group-item">{usuario.nombre}</li>
              <span>ID usuario: </span>
              <li className="list-group-item">{usuario.idusuario}</li>
              <span>DNI: </span>
              <li className="list-group-item">{usuario.email}</li>
              <span>Telefono: </span>
              <li className="list-group-item">{usuario.telefono}</li>
              <span>Direccion: </span>
              <li className="list-group-item">{usuario.direccion}</li>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <hr className="mt-4"></hr>
        </div>
      </div>
    </div>
  );
}

export default UsuarioIndividual;
