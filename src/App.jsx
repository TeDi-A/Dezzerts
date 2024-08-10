import { React, useState } from "react";
import "./App.css";

import {
  PageHeader,
  AllProductsBar,
  ProductItem,
  IntroSection,
  NewProductsSection,
} from "./pagebars/productsDisplay";
import { productsList, newProducts } from "./pagebars/productsList";
import { CartBar } from "./pagebars/cart";
import { Modal } from "./Modal";

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setshowCart] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [deletedItemId, setDeletedItemId] = useState(null);
  const [modalData, setModalData] = useState({ name: "", price: 0, desc: "" });

  function handlePurchase(productName, amount, productPrice, productId) {
    setCart((prevCart) => {
      const existingItem = prevCart.findIndex(
        (cartItem) => cartItem.name === productName,
      );
      let updatedCart;
      if (existingItem !== -1) {
        updatedCart = [...prevCart];
        updatedCart[existingItem] = {
          id: productId,
          ...updatedCart[existingItem],
          quantity: amount,
          price: productPrice * amount,
        };
      } else {
        updatedCart = [
          ...prevCart,
          {
            id: productId,
            name: productName,
            quantity: amount,
            price: productPrice,
          },
        ];
      }
      updatedCart = updatedCart.filter((cartItem) => cartItem.quantity > 0);
      // setshowCart(updatedCart.length > 0);
      return updatedCart;
    });
  }

  function handleOpenModal(e, productName, productPrice, productAbout) {
    setModalPosition({ x: e.clientX, y: e.clientY });
    setModalOpen(true);
    setModalData({
      name: productName,
      price: productPrice,
      about: productAbout,
    });
  }

  function handleDeleteCartItem(name, id) {
    setCart(cart.filter((cartItem) => cartItem.name !== name));
    handlePurchase();
    setDeletedItemId(id);
  }

  function handleCloseCart() {
    setshowCart(false);
  }
  function handleOpenCart() {
    setshowCart(true);
  }
  return (
    <>
      <div>
        <PageHeader openCart={handleOpenCart} cartcount={cart.length} />
        {showCart && (
          <CartBar
            handleDelete={handleDeleteCartItem}
            closeCart={handleCloseCart}
            cart={cart}
          />
        )}

        <IntroSection />

        <NewProductsSection>
          {newProducts.map((product) => (
            <ProductItem
              key={product.id}
              productId={product.id}
              productGroup={product.group}
              productName={product.name}
              productAbout={product.desc}
              productPrice={product.price}
              productImage={product.image}
              onPurchase={handlePurchase}
              onOpenModal={handleOpenModal}
              unDeleteItem={() => setDeletedItemId(null)}
              deleteItem={deletedItemId === product.id}
            />
          ))}
        </NewProductsSection>

        <AllProductsBar showCart={showCart}>
          {productsList.map((product) => (
            <ProductItem
              key={product.id}
              productId={product.id}
              productGroup={product.group}
              productName={product.name}
              productAbout={product.desc}
              productPrice={product.price}
              productImage={product.image}
              onPurchase={handlePurchase}
              onOpenModal={handleOpenModal}
              unDeleteItem={() => setDeletedItemId(null)}
              deleteItem={deletedItemId === product.id}
            />
          ))}
        </AllProductsBar>

        {showCart == false && isModalOpen == true ? (
          <Modal
            position={modalPosition}
            onClose={() => setModalOpen(false)}
            productModalName={modalData.name}
            productModalPrice={modalData.price}
            productModalAbout={modalData.about}
          />
        ) : (
          isModalOpen == false
        )}
      </div>
    </>
  );
}

export default App;
