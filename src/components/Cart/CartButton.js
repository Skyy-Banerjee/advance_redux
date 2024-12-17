import { useDispatch, useSelector } from "react-redux";
import classes from "./CartButton.module.css";
import { uiActions } from "../../features/ui/uiSlice";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartQty = useSelector((state) => state.cart.totalQuantity);
  const toggleCartHandler = () => {
    dispatch(uiActions.toggleCartVisibility());
  };

  return (
    <button onClick={toggleCartHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQty}</span>
    </button>
  );
};

export default CartButton;
