import { React, useState, useEffect } from "react";

export function ProductsBar({ children }) {
  return (
    <div className="show-tab">
      <h1>Main bar</h1>
      <div className="grid grid-cols-2 gap-4 p-1 md:grid-cols-3 lg:grid-cols-4">
        {children}
      </div>
    </div>
  );
}

function getImage(src) {
  return "./assets/" + src + ".jpg";
}

export function ProductItem({
  onOpenModal,
  onPurchase,
  image,
  group,
  name,
  price,
  unDeleteItem,
  deleteItem,
  id,
  desc,
}) {
  const [amount, setAmount] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [buttonText, setButtonText] = useState("🧺 Add to Cart");

  const enablePurchaseBtn = disabled;

  useEffect(() => {
    if (!disabled) {
      setDisabled(amount == 0 ? true : false);
      setButtonText(amount > 0 ? amount : "🧺 Add to Cart");
      onPurchase(name, amount, price, id);
    }
  }, [amount, disabled, name]);

  useEffect(() => {
    if (deleteItem) {
      setButtonText("🧺 Add to Cart");
      setAmount(0);
      setDisabled(true);
      unDeleteItem();
    }
  }, [deleteItem]);

  function handleDecrement() {
    setAmount((prevAmount) => {
      const newAmount = Math.max(prevAmount - 1, 0);
      return newAmount;
    });
  }

  function handleIncrement() {
    setAmount((prevAmount) => {
      const newAmount = prevAmount + 1;
      return newAmount;
    });
  }

  function handleOnClick() {
    setButtonText(amount);
    setDisabled(false);
    onPurchase(name, amount, price, id);
    setAmount((prevAmount) => prevAmount + 1);
  }

  return (
    <div
      onClick={() => onOpenModal("", name, price, desc)}
      className="show-tab product-item p-4"
    >
      <img className="product-img" src={getImage(image)} alt={name} />
      <div className=".item-btn flex justify-center">
        <button
          disabled={disabled}
          onClick={(e) => {
            handleDecrement();
            e.stopPropagation();
          }}
          className={`item-btn rounded-bl-full rounded-tl-full ${!disabled ? "enable-item-btn" : "hidden"}`}
        >
          -
        </button>
        <button
          disabled={!enablePurchaseBtn}
          onClick={(e) => {
            e.stopPropagation();
            handleOnClick(name);
          }}
          className={`item-btn hover:bg-orange-400 hover:text-white ${!disabled ? "enable-item-btn" : "rounded-full"}`}
        >
          {buttonText}
        </button>
        <button
          disabled={disabled}
          onClick={(e) => {
            handleIncrement();
            e.stopPropagation();
          }}
          className={`item-btn rounded-br-full rounded-tr-full ${!disabled ? "enable-item-btn" : "hidden"}`}
        >
          +
        </button>
      </div>
      <div className="item-description text-left text-sm">
        <h3 className="text-xs">{group}</h3>
        <h3 className="font-bold">{name}</h3>
        <p className="text- font-bold text-orange-500">{price}$ </p>
      </div>
    </div>
  );
}
