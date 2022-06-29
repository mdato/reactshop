import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { TrolleyState } from "../context/Context";
import "./styles.css";

const Header = () => {
  const {
    state: { trolley },
    dispatch,
    productDispatch,
  } = TrolleyState();

  return (
    <Navbar bg="dark" style={{ height: 60 }}>
      <Container>
        <Navbar.Brand>
          
          <Link to="/">
          <img src="./bacode.jpg" width="120" marginleft="-50" height="50" alt="bacode" />
          </Link>

        </Navbar.Brand>
        {useLocation().pathname.split("/")[1] !== "trolley" && (
          <Navbar.Text className="search">
            <FormControl
              style={{ width: 500 }}
              type="search"
              placeholder="Search a product..."
              className="m-auto"
              aria-label="Search"
              onChange={(e) => {
                productDispatch({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                });
              }}
            />
          </Navbar.Text>
        )}
        <Nav>
          <Dropdown alignRight>
            <Dropdown.Toggle variant="dark">
              <FaShoppingCart color="white" fontSize="25px" />
              <Badge>{trolley.length}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: 260 }}>
              {trolley.length > 0 ? (
                <>
                  {trolley.map((prod) => (
                    <span className="trolleyitem" key={prod.id}>
                      <img
                        src={prod.image}
                        className="trolleyItemImg"
                        alt={prod.name}
                      />
                      <div className="trolleyItemDetail">
                        <span>{prod.name}</span>
                        <span>$ {prod.price.split(".")[0]}</span>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE",
                            payload: prod,
                          })
                        }
                      />
                    </span>
                  ))}
                  <Link to="/trolley">
                    <Button variant="dark" style={{ width: "95%", margin: "0 7px" }}>
                      Go To Cart
                    </Button>
                  </Link>
                </>
              ) : (
                <span style={{ padding: 10 }}>Cart is Empty!</span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
