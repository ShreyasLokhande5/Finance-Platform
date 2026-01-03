"use client";

import React, { useEffect, useState } from "react";

const currencies = ["$", "€", "£", "¥", "₹", "₿", "₽", "₩"];

const FloatingCurrencies = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const newItems = [];
    // Create 20 floating items
    for (let i = 0; i < 20; i++) {
      newItems.push({
        id: i,
        symbol: currencies[Math.floor(Math.random() * currencies.length)],
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 15}s`,
        duration: `${15 + Math.random() * 15}s`,
        size: `${12 + Math.random() * 24}px`,
      });
    }
    setItems(newItems);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute text-blue-200 opacity-20 animate-float-up"
          style={{
            left: item.left,
            animationDelay: item.delay,
            animationDuration: item.duration,
            fontSize: item.size,
            bottom: "-50px", // Start below the screen
          }}
        >
          {item.symbol}
        </div>
      ))}
    </div>
  );
};

export default FloatingCurrencies;
