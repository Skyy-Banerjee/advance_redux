import { uiActions } from "../ui/uiSlice";
import { cartActions } from "./cartSlice";

export function fetchcartData() {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `https://redux-academind-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json`
      );
      if (!response.ok) {
        throw new Error(`Error fetching cart⚠️🛒`);
      }
      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!⚠️",
          message: "Fetching cart data failed❌⚠️",
        })
      );
    }
  };
}

export function sendCartData(cart) {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending request.. ⏳",
        message: "Sending cart data! 🛒⌛",
      })
    );

    //new f(x)
    const sendRequest = async () => {
      const response = await fetch(
        "https://redux-academind-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed ⚠️");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success! 🎉",
          message: "Cart data sent successfully ✅🛒",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!⚠️",
          message: "Sending cart data failed❌⚠️",
        })
      );
    }
  };
}
