import { useEffect, useState } from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { TrolleyState } from "../context/Context";

const Trolley = () => {
  const {
    state: { trolley },
    dispatch,
  } = TrolleyState();
  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      trolley.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [trolley]);

  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {trolley.map((prod) => (
            <ListGroup.Item key={prod.id}>
              <Row>
                <Col md={2}>
                  <Image src={prod.image} alt={prod.name} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{prod.name}</span>
                </Col>
                <Col md={2}>$ {prod.price}</Col>
                
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={prod.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "QTY",
                        payload: {
                          id: prod.id,
                          qty: e.target.value,
                        },
                      })
                    }
                  >
                    {[...Array(prod.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      dispatch({
                        type: "CART",
                        payload: prod,
                      })
                    }
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal ({trolley.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 15 }}>Total: $ {total}</span>
        <Button variant="secondary" type="button" disabled={trolley.length === 0}>
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default Trolley;
