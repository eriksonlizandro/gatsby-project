import React from 'react';
import { CartWrapper } from './styles';
import { FaShoppingCart } from 'react-icons/fa';
import CartContext from 'context/CartContext';

export function Cart() {
  const { checkout } = React.useContext(CartContext);
  console.log(checkout);

  //We declare a variable called totalQuantity and assign it a value of 0
  //then we create a loop using forEach that goes through the array checking the amount of items
  //then we add the items with the totalQuantity
  let totalQuantity = 0;
  if (checkout) {
    checkout.lineItems.forEach(lineItem => {
      totalQuantity = totalQuantity + lineItem.quantity;
    });
  }

  return (
    <CartWrapper>
      <FaShoppingCart size="1.5em" />
      <div>
        {totalQuantity} item(s) / ${checkout?.totalPrice || '0.00'}
      </div>
    </CartWrapper>
  );
}
