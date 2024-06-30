import { Button, Form, Modal, Alert, Row, Col } from 'react-bootstrap';
import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import useStorage from '../../hooks/useStorage';

export const AddAuction = ({ setAuction }) => {
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  const itemTitle = useRef();
  const itemDesc = useRef();
  const startPrice = useRef();
  const itemDuration = useRef();
  const itemImage = useRef();

  const { currentUser } = useContext(AuthContext);

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const imgTypes = ['image/png', 'image/jpeg', 'image/jpg'];

  const submitForm = async (e) => {
    e.preventDefault();
    setError('');

    if (!imgTypes.includes(itemImage.current.files[0].type)) {
      return setError('Por favor usa una imagen valida');
    }

    let currentDate = new Date();
    let dueDate = currentDate.setHours(
      currentDate.getHours() + itemDuration.current.value
    );

    let newAuction = {
      email: currentUser.email,
      title: itemTitle.current.value,
      desc: itemDesc.current.value,
      curPrice: startPrice.current.value,
      duration: dueDate,
      itemImage: itemImage.current.files[0],
    };

    setAuction(newAuction);
    closeForm();

  };

  return (
    <>
      <div className="col d-flex justify-content-center my-3">
        <div onClick={openForm} className="btn btn-outline-secondary mx-2">
          + Subasta
        </div>
      </div>
      <Modal centered show={showForm} onHide={closeForm}>
        <form onSubmit={submitForm}>
          <Modal.Header>
            <Modal.Title>Crear subasta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Titulo del articulo</Form.Label>
                  <Form.Control type="text" required ref={itemTitle} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Descripcion del articulo</Form.Label>
                  <Form.Control type="text" required ref={itemDesc} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Precio inicial</Form.Label>
                  <Form.Control type="number" required ref={startPrice} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Duracion del articulo en horas</Form.Label>
                  <Form.Control type="number" required ref={itemDuration} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Vendedor</Form.Label>
                  <Form.Control
                    type="text"
                    value={currentUser.email}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Imagen del articulo</Form.Label>
                  <Form.Control
                    type='file'
                    label="Selecciona imagen del articulo"
                    required
                    ref={itemImage}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeForm}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Subir
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};
