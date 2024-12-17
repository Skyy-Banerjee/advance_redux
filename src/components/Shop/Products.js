import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
const DUMMY_PRODUCTS = [
  {
    id: "p1",
    price: 6,
    title: "Product 1",
    description: "Product dummy description",
  },
  {
    id: "p2",
    price: 10,
    title: "Product 2",
    description: "Product dummy description 2",
  }
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {
          DUMMY_PRODUCTS.map((product) => (
            <ProductItem key={product.id} {...product} />
          ))
        }
      </ul>
    </section>
  );
};

export default Products;
