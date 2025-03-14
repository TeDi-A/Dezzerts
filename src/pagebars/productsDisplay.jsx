import { React, useState, useEffect } from "react";

export function PageHeader({ openCart, cartcount }) {
  return (
    <div className="sticky top-0 z-10 bg-orange-400">
      <button
        onClick={openCart}
        carttotal={cartcount}
        className="absolute right-4 m-3 text-3xl"
      >
        🛒{cartcount}
      </button>
      <h1>All Products</h1>
    </div>
  );
}

export function IntroSection() {
  return (
    <div className="intro-section -z-10">
      <div className="text-white">
        <h1 className="text-7xl">Divine Desserts</h1>
        <h2 className="text-5xl">Recipes for exquisite taste</h2>
      </div>
      <div className="h-100 h-screen">
        <img
          className="h-full"
          src="resources/backgrounds/section-image (2).png"
          alt=""
        />
      </div>
    </div>
  );
}

export function NewProductsSection({ children }) {
  return (
    <div>
      <h1>New Recipes</h1>
      <div className="horizontal-scroll m-4 grid grid-flow-col grid-rows-2 gap-4 overflow-x-auto whitespace-nowrap">
        {children}
      </div>
    </div>
  );
}

export function AllProductsBar({ children }) {
  return (
    <div>
      <h1>Breakfasts</h1>
      <div className="m-4 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {children}
      </div>
    </div>
  );
}

function getImage(src) {
  return "./assets/" + src + ".jpg";
}

export function ProductItem({
  productImage,
  productGroup,
  productName,
  productPrice,
  productId,
  productAbout,
  onOpenModal,
  onPurchase,
  unDeleteItem,
  deleteItem,
}) {
  const [amount, setAmount] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [buttonText, setButtonText] = useState("🛒 Add to Cart");

  const enablePurchaseBtn = disabled;

  useEffect(() => {
    if (!disabled) {
      setDisabled(amount == 0 ? true : false);
      setButtonText(amount > 0 ? amount : "🛒 Add to Cart");
      onPurchase(productName, amount, productPrice, productId);
    }
  }, [amount, disabled, productName]);

  useEffect(() => {
    if (deleteItem) {
      setButtonText("🛒 Add to Cart");
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
    onPurchase(productName, amount, productPrice, productId);
    setAmount((prevAmount) => prevAmount + 1);
  }

  return (
    <div
      onClick={() =>
        onOpenModal(event, productName, productPrice, productAbout)
      }
      className="show-tab product-item"
    >
      <img
        className="product-img"
        src={getImage(productImage)}
        alt={productName}
      />

      <div className="item-description text-left text-sm">
        <h3 className="text-xs">{productGroup}</h3>
        <h3 className="font-bold">{productName}</h3>
        <p className="text- font-bold text-orange-500">{productPrice}$ </p>
      </div>

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
            handleOnClick(productName);
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
    </div>
  );
}
