import { React, useState } from "react";
import "./App.css";

import { ProductsBar, ProductItem } from "./pagebars/productsDisplay";
import { productsList } from "./pagebars/productsList";
import { Sidebar } from "./pagebars/cart";
import { Modal } from "./Modal";

function App() {
  const [cart, setCart] = useState([
    { id: "", name: "", quantity: "", price: "" },
  ]);
  const [showCart, setshowCart] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [deletedItemId, setDeletedItemId] = useState(null);
  const [modalData, setModalData] = useState({ name: "", price: 0, desc: "" });

  function handlePurchase(name, amount, price, id) {
    setCart((prevCart) => {
      const existingItem = prevCart.findIndex(
        (cartItem) => cartItem.name === name,
      );
      let updatedCart;
      if (existingItem !== -1) {
        updatedCart = [...prevCart];
        updatedCart[existingItem] = {
          id: id,
          ...updatedCart[existingItem],
          quantity: amount,
          price: price * amount,
        };
      } else {
        updatedCart = [
          ...prevCart,
          {
            id: id,
            name: name,
            quantity: amount,
            price: price,
          },
        ];
      }
      updatedCart = updatedCart.filter((cartItem) => cartItem.quantity > 0);
      setshowCart(updatedCart.length > 0);
      console.log(updatedCart);
      return updatedCart;
    });
  }

  function handleOpenModal(e, name, price, desc) {
    setModalPosition({ x: e.clientX, y: e.clientY });
    setModalOpen(true);
    setModalData({ name: name, price: price, desc: desc });
    console.log(modalData);
  }

  function handleDeleteCartItem(name, id) {
    setCart(cart.filter((cartItem) => cartItem.name !== name));
    handlePurchase();
    setDeletedItemId(id);
  }

  return (
    <>
      <div
        className={`m-6 ${showCart ? "flex flex-col gap-3 smd:grid" : ""} `}
        style={{ gridTemplateColumns: showCart ? "2fr 1fr" : "initial" }}
      >
        <ProductsBar showCart={showCart}>
          {productsList.map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              group={product.group}
              name={product.name}
              desc={product.desc}
              price={product.price}
              image={product.image}
              onPurchase={handlePurchase}
              onOpenModal={handleOpenModal}
              unDeleteItem={() => setDeletedItemId(null)}
              deleteItem={deletedItemId === product.id}
            />
          ))}
        </ProductsBar>
        {showCart && (
          <Sidebar handleDelete={handleDeleteCartItem} cart={cart} />
        )}
        {isModalOpen && (
          <Modal
            position={modalPosition}
            onClose={() => setModalOpen(false)}
            name={modalData.name}
            price={modalData.price}
            desc={modalData.desc}
          />
        )}
      </div>
    </>
  );
}

export default App;
