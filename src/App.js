import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import Notification from "./components/UI/Notification";
import { fetchcartData, sendCartData } from "./features/cart/cartActions";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((store) => store.ui.cartIsVisible);
  const cart = useSelector((store) => store.cart);
  console.log("cartIsVisible:", showCart);
  const notification = useSelector((store) => store.ui.notification); // Corrected here to 'notification'

  useEffect(() => {
    dispatch(fetchcartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <>
      <Layout>
        {/* Render Notification */}
        {notification && (
          <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
        )}
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
