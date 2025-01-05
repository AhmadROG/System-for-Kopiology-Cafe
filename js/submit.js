function submitCart() {
    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }
  
    alert('Your order has been submitted.');
    cart = []; // Clear the cart after submission
    updateCart();
  }
  