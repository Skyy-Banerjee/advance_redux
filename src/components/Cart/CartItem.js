import { useDispatch } from "react-redux";
import classes from "./CartItem.module.css";
import { cartActions } from "../../features/cart/cartSlice";

const CartItem = (props) => {
  const { title, quantity, total, price, id } = props.item;
  const dispatch = useDispatch();

  function addItemHandler() {
    dispatch(
      cartActions.addItem({
        id,
        title,
        price,
        quantity,
      })
    );
  }
  function removeItemHandler() {
    dispatch(cartActions.removeItem(id));
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemHandler}>-</button>
          <button onClick={addItemHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
