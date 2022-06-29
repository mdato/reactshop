import { Card, Button } from "react-bootstrap";
import { TrolleyState } from "../context/Context";

const ProductBase = ({ prod }) => {
  const {
    state: { trolley },
    dispatch,
  } = TrolleyState();

  return (
    <div className="products">
      <Card>
        <Card.Img variant="top" src={prod.image} alt={prod.name} />
        <Card.Body>
          <Card.Title>{prod.name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>$ {prod.price.split(".")[0]}</span>
            {prod.fastDelivery ? (
              <div>Fast Delivery</div>
            ) : (
              <div>4 days delivery</div>
            )}
            
          </Card.Subtitle>
          {trolley.some((p) => p.id === prod.id) ? (
            <Button
              variant="danger"
              onClick={() =>
                dispatch({
                  type: "REMOVE",
                  payload: prod,
                })
              }
            >
              Remove item
            </Button>
          ) : (
            <Button
            variant="dark"
              onClick={() =>
                dispatch({
                  type: "ADD",
                  payload: prod,
                })
              }
              disabled={!prod.inStock}
            >
              {!prod.inStock ? "Out of Stock" : "Add to Cart"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductBase;
