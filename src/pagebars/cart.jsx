import { useEffect } from "react";

function CartItem({ name, quantity, price, DelItem }) {
  return (
    <div className="flex flex-row justify-between">
      <div className="text-left">
        <h2>{name}</h2>
        <p>{quantity !== "" ? quantity + "x" : ""}</p>
        <p>{price !== "" ? price + "$" : ""}</p>
      </div>
      {<button onClick={DelItem}>❌</button>}
    </div>
  );
}

export function CartBar({ cart, handleDelete, closeCart }) {
  useEffect(() => {
    document.body.classList.add("disable-scroll");
    return () => {
      document.body.classList.remove("disable-scroll");
    };
  }, []);

  return (
    <div className="cart-backdrop" onClick={closeCart}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="show-tab cart fixed my-2 h-5/6 w-9/12 bg-orange-300 p-3 opacity-90"
      >
        <button className="text-red-700" onClick={closeCart}>
          Close Cart
        </button>
        <h1 className="header">Cart</h1>
        {cart.length === 0 ? (
          <div className="text-center">
            <h2>Cart is Empty. Make purchases</h2>
          </div>
        ) : (
          cart.map((cartItem) => (
            <CartItem
              key={cartItem.id}
              name={cartItem.name}
              quantity={cartItem.quantity}
              price={cartItem.price}
              DelItem={() => handleDelete(cartItem.name, cartItem.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
