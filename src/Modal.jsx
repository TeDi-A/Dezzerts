import React, { useEffect, useState } from "react";

export function Modal({ position, onClose, productModalName, productModalPrice, productModalAbout }) {
  const [modalStyle, setModalStyle] = useState({});

  useEffect(() => {
    const { x, y } = position;

    setModalStyle({
      "--startX": `${x}px`,
      "--startY": `${y}px`,
    });
  }, [position]);

  return (
    <div
      className="modal-backdrop fixed flex w-screen items-center justify-center"
      style={modalStyle}
    >
      <div className="modal-content relative z-10 m-auto w-4/5 gap-4 rounded bg-white text-left md:flex">
        <button
          className="absolute right-3 top-3 cursor-pointer"
          onClick={onClose}
        >
          ❌
        </button>
        <div className="flex flex-col content-center">
          <h1>{productModalName}</h1>
          <h2>{productModalAbout}</h2>
        </div>
        <h3 className="self-center">{productModalPrice}$</h3>
      </div>
    </div>
  );
}
