import React from 'react';
import { QuantityAdjusterWrapper, AdjusterButton } from './styles';

//Logic for adding and removing items in the cart 
export function QuantityAdjuster({ item, onAdjust }) {
  const { quantity } = item;

  //Remove  items
  const handleDecrementQuantity = () => {
    onAdjust({ variantId: item.variant.id, quantity: -1 });
  };
  //Add items 
  const handleIncrementQuantity = () => {
    onAdjust({ variantId: item.variant.id, quantity: 1 });
  };

  return (
    <QuantityAdjusterWrapper>
      <AdjusterButton onClick={handleDecrementQuantity}>-</AdjusterButton>
      <div>{quantity}</div>
      <AdjusterButton onClick={handleIncrementQuantity}>+</AdjusterButton>
    </QuantityAdjusterWrapper>
  );
}
