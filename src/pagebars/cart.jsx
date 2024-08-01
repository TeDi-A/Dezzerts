function CartItem({ name, quantity, price, handleDelClick }) {
  return (
    <div className="flex flex-row justify-between">
      <div className="text-left">
        <h2>{name}</h2>
        <p>{quantity}x</p>
        <p>{price}$</p>
      </div>
      <button onClick={handleDelClick}>✖️</button>
    </div>
  );
}

export function Sidebar({ cart, handleDelete }) {
  return (
    <div className="show-tab cart smd:h p-3">
      <h1 className="header">Side bar</h1>
      <ul>
        {cart.map((item, index) => (
          <CartItem
            key={index}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            handleDelClick={() => handleDelete(item.name, item.id)}
          />
        ))}
      </ul>
    </div>
  );
}
