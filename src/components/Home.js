import { TrolleyState } from "../context/Context";
import Filters from "./Filters";
import ProductBase from "./ProductBase";

const Home = () => {
  const {
    state: { products },
    productState: { sort, byStock, byFastDelivery, searchQuery },
  } = TrolleyState();

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  return (
    <div className="home">
      <Filters />
      <div className="productContainer">
        {transformProducts().map((prod) => (
          <ProductBase prod={prod} key={prod.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
